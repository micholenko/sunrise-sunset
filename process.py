import json
import os

def process_data():
    """
    Reads data.json and creates a dictionary where:
    - Key: common name of the country
    - Value: [latitude, longitude] coordinates
    """
    # Get the path to data.json in the src directory
    data_file_path = os.path.join('src', 'data.json')
    
    try:
        # Read the JSON file
        with open(data_file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
        
        # Create dictionary with common name as key and latlng as value
        result_dict = {}
        
        for country in data:
            # Extract common name
            common_name = country.get('name', {}).get('common')
            
            # Extract latitude and longitude
            latlng = country.get('latlng')
            
            # Only add to dictionary if both common name and latlng exist
            if common_name and latlng:
                result_dict[common_name] = latlng
        
        return result_dict
    
    except FileNotFoundError:
        print(f"Error: Could not find {data_file_path}")
        return {}
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in {data_file_path}")
        return {}
    except Exception as e:
        print(f"Error processing data: {e}")
        return {}

def main():
    """Main function to demonstrate the processing"""
    countries_dict = process_data()
    
    print(f"Processed {len(countries_dict)} countries")
    print("\nFirst 5 entries:")
    
    # Display first 5 entries as example
    for i, (country, coords) in enumerate(countries_dict.items()):
        if i < 5:
            print(f"  {country}: {coords}")
        else:
            break
    
    # Optionally save to a new JSON file
    output_file = 'countries_coordinates.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(countries_dict, f, indent=2, ensure_ascii=False)
    
    print(f"\nResult saved to {output_file}")
    
    return countries_dict

if __name__ == "__main__":
    result = main()
