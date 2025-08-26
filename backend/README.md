# Sunrise Sunset Backend

A FastAPI backend that acts as a proxy for the sunrise-sunset.org API with automatic timezone conversion.

## Features

- Proxy requests to sunrise-sunset.org API
- Automatic timezone detection based on coordinates
- Time conversion from UTC to local timezone
- CORS support for frontend integration

## Installation

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

## Running the Backend

### Development Mode
```bash
python start.py
```

Or directly with uvicorn:
```bash
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

The API will be available at: http://localhost:8000

## API Endpoints

### GET /api/sunrise-sunset

Get sunrise and sunset times for given coordinates and date, converted to local timezone.

**Parameters:**
- `lat` (float): Latitude
- `lng` (float): Longitude  
- `date` (string): Date in YYYY-MM-DD format

**Response:**
```json
{
  "results": {
    "sunrise": "2023-01-01T06:30:00+01:00",
    "sunset": "2023-01-01T18:45:00+01:00",
    "solar_noon": "2023-01-01T12:37:30+01:00",
    "day_length": "12:15:00",
    "civil_twilight_begin": "2023-01-01T06:00:00+01:00",
    "civil_twilight_end": "2023-01-01T19:15:00+01:00",
    "nautical_twilight_begin": "2023-01-01T05:25:00+01:00",
    "nautical_twilight_end": "2023-01-01T19:50:00+01:00",
    "astronomical_twilight_begin": "2023-01-01T04:50:00+01:00",
    "astronomical_twilight_end": "2023-01-01T20:25:00+01:00"
  },
  "status": "OK",
  "timezone": "Europe/Berlin",
  "coordinates": {"lat": 52.52, "lng": 13.405}
}
```

## Dependencies

- **FastAPI**: Modern, fast web framework for building APIs
- **httpx**: Async HTTP client for making external API requests
- **pytz**: World timezone definitions
- **timezonefinder**: Fast offline timezone lookup from coordinates
- **uvicorn**: ASGI server for running the FastAPI app
