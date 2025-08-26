import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {HeroUIProvider} from "@heroui/react";

// Only initialize Application Insights in production
const isProduction = import.meta.env.PROD;
let appInsights: ApplicationInsights | null = null;

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

if (isProduction) {
  const connectionString = import.meta.env.VITE_APPINSIGHTS_CONNECTION_STRING;
  if (!connectionString) {
    throw new Error('VITE_APPINSIGHTS_CONNECTION_STRING is not defined');
  }

  appInsights = new ApplicationInsights({
    config: {
      connectionString: connectionString,
      enableAutoRouteTracking: true
    }
  });

  appInsights.loadAppInsights();
  appInsights.trackPageView({ name: "HomePage" });
}

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <App appInsights={appInsights} />
        </HeroUIProvider>
      </QueryClientProvider>
  </StrictMode>
)
