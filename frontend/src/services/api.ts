import type { FetchSunriseSunsetParams, SunriseSunsetResponse } from '../types'
import type { CalendarDate } from '@heroui/react'

// Get backend URL from environment variable or use localhost as fallback
const getBackendUrl = (): string => {
  const envUrl = import.meta.env.VITE_BACKEND_URL
  return envUrl || 'http://localhost:8000'
}
export const dateValueToString = (dateValue: CalendarDate): string => {
  return `${dateValue.year}-${dateValue.month.toString().padStart(2, '0')}-${dateValue.day.toString().padStart(2, '0')}`
}

export const formatDateForDisplay = (dateValue: CalendarDate): string => {
  return new Date(dateValue.year, dateValue.month - 1, dateValue.day).toLocaleDateString()
}

// Function to fetch sunrise-sunset data from our backend proxy
export const fetchSunriseSunsetData = async ({ 
  country,
  date, 
  appInsights, 
  selectedCountry 
}: FetchSunriseSunsetParams): Promise<SunriseSunsetResponse> => {
  const startTime = Date.now()
  
  // Track user action
  appInsights?.trackEvent({
    name: 'SunriseSunsetRequest',
    properties: {
      country: selectedCountry.label,
      countryCode: selectedCountry.countryCode || 'unknown',
      date: date
    }
  })

  const backendUrl = getBackendUrl()
  const apiUrl = `${backendUrl}/api/sunrise-sunset?country=${encodeURIComponent(country)}&date=${date}`
  
  const response = await fetch(apiUrl)
  const data = await response.json()
  const duration = Date.now() - startTime
  
  if (!response.ok) {
    const backendTarget = backendUrl.replace('http://', '').replace('https://', '')
    appInsights?.trackDependencyData({
      id: `sunrise-sunset-backend-${Date.now()}`,
      target: backendTarget,
      name: 'GET /api/sunrise-sunset',
      data: apiUrl,
      duration: duration,
      success: false,
      responseCode: response.status,
      properties: {
        country: selectedCountry.label,
        countryCode: selectedCountry.countryCode || 'unknown',
        date: date,
        error: data.detail || 'Network error'
      }
    })
    throw new Error(data.detail || 'Failed to fetch data')
  }
  
  // Track successful API request
  const backendTarget = backendUrl.replace('http://', '').replace('https://', '')
  appInsights?.trackDependencyData({
    id: `sunrise-sunset-backend-${Date.now()}`,
    target: backendTarget,
    name: 'GET /api/sunrise-sunset',
    data: apiUrl,
    duration: duration,
    success: true,
    responseCode: response.status,
    properties: {
      country: selectedCountry.label,
      countryCode: selectedCountry.countryCode || 'unknown',
      date: date,
      coordinates: data.coordinates ? data.coordinates.join(', ') : 'unknown'
    }
  })
  
  appInsights?.trackMetric({
    name: 'API Response Time',
    average: duration,
    properties: {
      endpoint: 'sunrise-sunset-backend'
    }
  })
  
  return data
}
