import { useState } from 'react'
import { Button } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'
import { DatePickerComponent, CountrySelect, Results } from './components'
import { fetchSunriseSunsetData, dateValueToString } from './services/api'
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import type { CalendarDate } from '@heroui/react'
import type {
  AppProps,
  CountryOption
} from './types'

// Register the locale
countries.registerLocale(enLocale);

function App({ appInsights }: AppProps) {
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<string>('')

  // Get country options as a dictionary
  const countryOptions = countries.getNames('en', { select: 'alias' });

  // Prepare query parameters
  const queryParams = selectedDate && selectedCountry ? {
    country: selectedCountry,
    date: dateValueToString(selectedDate),
    appInsights,
    selectedCountry: {
      key: selectedCountry,
      label: selectedCountry,
      value: selectedCountry,
      description: `Selected country: ${selectedCountry}`,
      countryCode: Object.keys(countryOptions).find(code => countryOptions[code] === selectedCountry)?.toLowerCase()
    } as CountryOption
  } : null

  // Use react-query to fetch data
  const {
    data: sunriseSunsetData,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['sunriseSunset', queryParams],
    queryFn: () => fetchSunriseSunsetData(queryParams!),
    enabled: false, // Disable automatic fetching
    retry: 1,
  })

  const handleShow = () => {
    if (!selectedDate || !selectedCountry) return
    refetch()
  }

  return (
    <div className="container max-w-[600px] mx-auto p-10">
      <h1 className="text-center text-2xl font-bold mb-10">Sunrise Sunset App</h1>

      <div className="flex gap-8 flex-col sm:flex-row">
        <DatePickerComponent
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />

        <CountrySelect
          selectedCountry={selectedCountry}
          onCountryChange={setSelectedCountry}
          countryOptions={countryOptions}
        />
      </div>

      <div className="text-center mt-5">
        <Button
          color="primary"
          onClick={handleShow}
          isDisabled={!selectedDate || !selectedCountry || isLoading}
          isLoading={isLoading}
        >
          {isLoading ? "Loading..." : "Show"}
        </Button>
      </div>

      <Results
        data={sunriseSunsetData || null}
        isLoading={isLoading}
        error={error}
      />
    </div>
  )
}

export default App
