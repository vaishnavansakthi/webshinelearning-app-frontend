import React from 'react'
import ReactDOM from 'react-dom/client'
import ReactGA from 'react-ga4';
import TagManager from 'react-gtm-module';
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root')
const tagManagerArgs = {
  gtmId: 'GTM-WNJDZHGH', // Use your GTM ID
};

if (!rootElement) {
  throw new Error("Root element with ID 'root' not found in the document.")
}

/**
 * Main component
 */
ReactGA.initialize('G-V4ZRLH0DM0', {
  // debug: true, // Uncomment this to enable debug mode
});
TagManager.initialize(tagManagerArgs);
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
