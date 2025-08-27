import type { FetchSunriseSunsetParams, SunriseSunsetResponse } from '../types'
import { CalendarDate } from '@internationalized/date'

// Get backend URL from environment variable or use localhost as fallback
const getBackendUrl = (): string => {
  const envUrl = import.meta.env.VITE_BACKEND_URL
  return envUrl || 'http://localhost:8000'
}
export const dateValueToString = (dateValue: CalendarDate | null | undefined): string => {
  if (!dateValue) return ''
  return `${dateValue.year}-${dateValue.month.toString().padStart(2, '0')}-${dateValue.day.toString().padStart(2, '0')}`
}

export const fetchSunriseSunsetData = async ({ 
  country_code,
  date, 
  appInsights, 
}: FetchSunriseSunsetParams): Promise<SunriseSunsetResponse> => {
  const startTime = Date.now()

  // Track user action
  appInsights?.trackEvent({
    name: 'SunriseSunsetRequest',
    properties: {
      country_code: country_code,
      date: date
    }
  })

  const backendUrl = getBackendUrl()
  const apiUrl = `${backendUrl}/api/sunrise-sunset?country_code=${encodeURIComponent(country_code)}&date=${date}`

  const response = await fetch(apiUrl)
  const data = await response.json()
  const duration = Date.now() - startTime
  
  if (!response.ok) {
    throw new Error(data.detail || 'Failed to fetch data')
  }
  
  // Track API response time
  appInsights?.trackMetric({
    name: 'API Response Time',
    average: duration,
    properties: {
      endpoint: 'sunrise-sunset-backend'
    }
  })
  
  return data
}
