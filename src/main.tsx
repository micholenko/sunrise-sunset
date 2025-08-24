import { StrictMode } from 'react'
import { render } from 'react-dom'
import './index.css'
import App from './App.tsx'
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const connectionString = import.meta.env.VITE_APPINSIGHTS_CONNECTION_STRING;
if (!connectionString) {
  throw new Error('VITE_APPINSIGHTS_CONNECTION_STRING is not defined');
}

const appInsights = new ApplicationInsights({
  config: {
    connectionString: connectionString,
    enableAutoRouteTracking: true
  }
});

appInsights.loadAppInsights();
appInsights.trackPageView({ name: "HomePage" });

render(
  <StrictMode>
    <App appInsights={appInsights} />
  </StrictMode>,
  document.getElementById('root')!
)
