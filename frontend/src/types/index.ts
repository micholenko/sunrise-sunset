import { CalendarDate } from '@internationalized/date'
import { ApplicationInsights } from '@microsoft/applicationinsights-web'


export interface SunriseSunsetResponse {
  sunrise: string
  sunset: string
  timezone: string
}

export interface AppProps {
  appInsights: ApplicationInsights | null
}

export interface FetchSunriseSunsetParams {
  country_code: string
  date: string
  appInsights: ApplicationInsights | null
}

export interface DatePickerComponentProps {
  selectedDate: CalendarDate | null | undefined
  onDateChange: (date: CalendarDate | null) => void
}

export interface CountrySelectProps {
  selectedCountry: string
  onCountryChange: (country: string) => void
}

export interface ResultsProps {
  data: SunriseSunsetResponse | null
  isLoading: boolean
  error: Error | null
}
