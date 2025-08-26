from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
import json

app = FastAPI(title="Sunrise Sunset API Proxy", version="1.0.0")

# Load countries coordinates
countries_coordinates = {}
try:
    with open("countries_coordinates.json", "r", encoding="utf-8") as f:
        countries_coordinates = json.load(f)
except FileNotFoundError:
    print("Warning: countries_coordinates.json not found. Country lookup will not work.")
except json.JSONDecodeError as e:
    print(f"Error loading countries_coordinates.json: {e}")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173" ,"https://purple-sky-0cb669b03.1.azurestaticapps.net"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Sunrise Sunset API Proxy"}

@app.get("/api/sunrise-sunset")
async def get_sunrise_sunset(country: str, date: str):
    """
    Proxy endpoint for sunrisesunset.io API which returns times in local timezone.
    
    Args:
        country: Country name to lookup coordinates
        date: Date in YYYY-MM-DD format
    """
    try:
        # Look up coordinates for the country
        if country not in countries_coordinates:
            raise HTTPException(status_code=400, detail=f"Country '{country}' not found in coordinates database")
        
        coordinates = countries_coordinates[country]
        if not coordinates or len(coordinates) < 2:
            raise HTTPException(status_code=400, detail=f"Invalid coordinates for country '{country}'")
        
        lat, lng = coordinates[0], coordinates[1]
        
        # Make request to sunrisesunset.io API (returns times in local timezone)
        api_url = f"https://api.sunrisesunset.io/json?lat={lat}&lng={lng}&date={date}&time_format=24"
        
        async with httpx.AsyncClient() as client:
            response = await client.get(api_url)
            response.raise_for_status()
            data = response.json()
        
        if data.get("status") != "OK":
            raise HTTPException(status_code=400, detail=f"External API error: {data.get('status', 'Unknown error')}")
        
        # Return the results as-is since they're already in local timezone
        results = data["results"]
        print(f"Results for {country} ({lat}, {lng}) on {date}:", results)
        
        return {
            "sunrise": results.get("sunrise"),
            "sunset": results.get("sunset"),
            "country": country,
            "coordinates": [lat, lng]
        }
        
    except HTTPException:
        # Re-raise HTTPExceptions as-is
        raise
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
