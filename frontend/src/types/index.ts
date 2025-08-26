import type { CalendarDate } from '@heroui/react'
import { ApplicationInsights } from '@microsoft/applicationinsights-web'

export type CountriesData = Record<string, number[]>

export type CountryOption = {
  key: string
  label: string
  value: string
  description: string
  countryCode?: string
}

export interface SunriseSunsetResponse {
  sunrise: string
  sunset: string
  results?: {
    sunrise: string
    sunset: string
    [key: string]: string | number
  }
}

export interface AppProps {
  appInsights: ApplicationInsights | null
}

export interface FetchSunriseSunsetParams {
  country: string
  date: string
  appInsights: ApplicationInsights | null
  selectedCountry: CountryOption
}

export interface DatePickerComponentProps {
  selectedDate: CalendarDate | null | undefined
  onDateChange: (date: CalendarDate | null) => void
}

export interface CountrySelectProps {
  selectedCountry: string
  onCountryChange: (country: string) => void
  countryOptions: Record<string, string>
}

export interface ResultsProps {
  data: SunriseSunsetResponse | null
  isLoading: boolean
  error: Error | null
}
