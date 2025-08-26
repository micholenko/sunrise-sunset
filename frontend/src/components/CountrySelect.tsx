import { Autocomplete, AutocompleteItem } from '@heroui/react'
import type { CountrySelectProps } from '../types'

const CountryFlag = ({ countryCode }: { countryCode?: string }) => {
  if (!countryCode) return null;
  
  return (
    <img 
      src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`}
      alt={`Flag of ${countryCode}`}
      className="w-5 h-3 object-cover rounded-sm mr-2"
      onError={(e) => {
        // Hide the image if it fails to load
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );
};

export const CountrySelect = ({ selectedCountry, onCountryChange, countryOptions }: CountrySelectProps) => {
  console.log(countryOptions);
  
  // Convert the dictionary to an array of options
  const optionsArray = Object.entries(countryOptions).map(([countryCode, countryName]) => ({
    key: countryName,
    label: countryName,
    value: countryName,
    description: `Country code: ${countryCode}`,
    countryCode: countryCode.toLowerCase()
  })).sort((a, b) => a.label.localeCompare(b.label));
  
  return (
    <div className="flex-1">
      <Autocomplete
        label="Select Country"
        labelPlacement='outside'
        placeholder="Search for a country..."
        selectedKey={selectedCountry}
        onSelectionChange={(key) => onCountryChange(key as string)}
        className="w-full"
      >
        {optionsArray.map((option) => (
          <AutocompleteItem 
            key={option.key}
            startContent={<CountryFlag countryCode={option.countryCode} />}
          >
            {option.label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  )
}
