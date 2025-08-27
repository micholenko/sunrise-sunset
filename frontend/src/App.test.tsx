import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { ApplicationInsights } from '@microsoft/applicationinsights-web'

// Mock ApplicationInsights
const mockAppInsights = {
  trackEvent: vi.fn(),
  trackDependencyData: vi.fn(),
  trackException: vi.fn(),
  trackMetric: vi.fn(),
} as unknown as ApplicationInsights

// Helper function to render components with QueryClient provider
const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  )
}

describe('App Component', () => {
  it('renders the app title', () => {
    renderWithProviders(<App appInsights={mockAppInsights} />)
    
    // Check if the main heading is rendered
    expect(screen.getByText('Sunrise Sunset App')).toBeInTheDocument()
  })

  it('renders date picker and country lookup', () => {
    renderWithProviders(<App appInsights={mockAppInsights} />)
    
    // Check if date picker label is present
    expect(screen.getByText('Select Date')).toBeInTheDocument()
    
    // Check if country lookup label is present
    expect(screen.getByText('Select Country')).toBeInTheDocument()
  })

  it('renders show button that is initially disabled', () => {
    renderWithProviders(<App appInsights={mockAppInsights} />)
    
    // Check if the Show button is present and disabled
    const showButton = screen.getByRole('button', { name: /^show$/i })
    expect(showButton).toBeInTheDocument()
    expect(showButton).toBeDisabled()
  })

  it('renders without crashing with valid props', () => {
    expect(() => {
      renderWithProviders(<App appInsights={mockAppInsights} />)
    }).not.toThrow()
  })
})
