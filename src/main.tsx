import React from 'react'
import ReactDOM from 'react-dom/client'
import ReactGA from 'react-ga4';
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error("Root element with ID 'root' not found in the document.")
}

/**
 * Main component
 */
ReactGA.initialize('G-V4ZRLH0DM0', {
  // debug: true, // Uncomment this to enable debug mode
});
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
