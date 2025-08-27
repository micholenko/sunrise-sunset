import { useState } from 'react'
import { Button } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'
import { DatePickerComponent, CountrySelect, Results } from './components'
import { fetchSunriseSunsetData, dateValueToString } from './services/api'
import { CalendarDate } from '@internationalized/date'
import type {
  AppProps,
} from './types'


function App({ appInsights }: AppProps) {
  const today = new Date()
  const todayCD = new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate())

  const [selectedDate, setSelectedDate] = useState<CalendarDate | null | undefined>(todayCD)
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('')

  // Use react-query to fetch data
  const {
    data: sunriseSunsetData,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['sunriseSunset', selectedCountryCode, selectedDate ? dateValueToString(selectedDate) : null],
    queryFn: () => fetchSunriseSunsetData({
      country_code: selectedCountryCode,
      date: dateValueToString(selectedDate),
      appInsights
    }),
    enabled: false,
    retry: 1,
  })

  const handleShow = () => {
    if (!selectedDate || !selectedCountryCode) return
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
          selectedCountry={selectedCountryCode}
          onCountryChange={setSelectedCountryCode}
        />
      </div>

      <div className="text-center mt-5">
        <Button
          color="primary"
          onPress={handleShow}
          isDisabled={!selectedDate || !selectedCountryCode || isLoading}
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
