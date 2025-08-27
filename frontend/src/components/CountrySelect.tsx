import { Autocomplete, AutocompleteItem } from '@heroui/react'
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

import type { CountrySelectProps } from '../types'

const CountryFlag = ({ countryCode }: { countryCode?: string }) => {
  if (!countryCode) return null;
  
  return (
    <img 
      src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`}
      alt={`Flag of ${countryCode}`}
      className="w-5 h-3 object-cover rounded-sm mr-2"
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );
};

countries.registerLocale(enLocale);
// Build once at module load
const countryOptions = countries.getNames('en', { select: 'alias' });
const optionsArray = Object.entries(countryOptions)
  .map(([countryCode, countryName]) => ({
    key: countryCode,
    label: countryName,
    countryCode: countryCode.toLowerCase(),
  }))
  .sort((a, b) => a.label.localeCompare(b.label));


export const CountrySelect = ({ selectedCountry, onCountryChange }: CountrySelectProps) => {
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
