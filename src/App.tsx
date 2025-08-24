import { useState } from 'react'
import { DatePicker, Lookup, Button } from 'react-rainbow-components'
import countriesData from './assets/countries_coordinates.json'

type CountriesData = Record<string, number[]>

type CountryOption = {
  key: string
  label: string
  value: string
  description: string
}

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null)
  const [sunriseSunsetData, setSunriseSunsetData] = useState<any>(null)

  const handleShow = async () => {
    if (!selectedDate || !selectedCountry) return;
    
    console.log('Selected Date:', selectedDate)
    console.log('Selected Country:', selectedCountry)
    
    try {
      // Get coordinates for the selected country
      const coordinates = (countriesData as CountriesData)[selectedCountry.label];
      console.log('Coordinates for country:', selectedCountry, coordinates);
      if (!coordinates || coordinates.length < 2) {
        console.error('Invalid coordinates for country:', selectedCountry);
        return;
      }
      
      const [lat, lng] = coordinates;
      const formattedDate = selectedDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      
      // Make API request to sunrise-sunset.org
      const apiUrl = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${formattedDate}&formatted=0`;
      console.log('Making API request to:', apiUrl);
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      setSunriseSunsetData(data);
      
      if (data.status === 'OK') {
        console.log('Sunrise-Sunset Data:', data.results);
        // You can add state to store and display this data
      } else {
        console.error('API Error:', data.status);
      }
    } catch (error) {
      console.error('Error fetching sunrise-sunset data:', error);
    }
  }

  // const handleDateChange = (date: string | Date) => {
  //   if (typeof date === 'string') {
  //     setSelectedDate(new Date(date))
  //   } else if (date instanceof Date) {
  //     setSelectedDate(date)
  //   }
  // }

  const countries = countriesData as CountriesData

  // Convert countries data to options format for Lookup
  const countryOptions = Object.keys(countries).map((countryName) => ({
    key: countryName,
    label: countryName,
    value: countryName,
    description: `Coordinates: ${countries[countryName]?.join(', ')}`
  }))

  console.log('Country Options:', countryOptions)

  return (
    <div className="container" style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Sunrise Sunset App</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div>
          <DatePicker
            label="Select Date"
            placeholder="Choose a date..."
            value={selectedDate}
            onChange={(value: Date) => setSelectedDate(value)}
            locale="en-US"
          />
        </div>

        <div>
          <Lookup
            label="Select Country"
            placeholder="Search for a country..."
            value={selectedCountry}
            onChange={(value: string) => {
              const countryOption = countryOptions.find(option => option.value === value);
              setSelectedCountry(countryOption || null);
            }}
            options={countryOptions}
            debounceTimeout={300}
          />
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button
            label="Show"
            variant="brand"
            onClick={handleShow}
            disabled={!selectedDate || !selectedCountry}
          />
        </div>
        {selectedDate && selectedCountry && (
          <div style={{ 
            marginTop: '30px', 
            padding: '20px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '8px',
            border: '1px solid #e9ecef'
          }}>
            <h3>Selected Information:</h3>
            <p><strong>Date:</strong> {selectedDate.toLocaleDateString()}</p>
            <p><strong>Country:</strong> {selectedCountry.label}</p>
            <p><strong>Coordinates:</strong> {countries[selectedCountry.value]?.join(', ')}</p>
          </div>
        )}
        {sunriseSunsetData && sunriseSunsetData.status === 'OK' && (
          <div style={{ 
            marginTop: '30px', 
            padding: '20px', 
            backgroundColor: '#e6ffed', 
            borderRadius: '8px',
            border: '1px solid #b7eb8f'
          }}>
            <h3>Sunrise and Sunset Times (UTC):</h3>
            <p><strong>Sunrise:</strong> {new Date(sunriseSunsetData.results.sunrise).toLocaleTimeString()}</p>
            <p><strong>Sunset:</strong> {new Date(sunriseSunsetData.results.sunset).toLocaleTimeString()}</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default App
