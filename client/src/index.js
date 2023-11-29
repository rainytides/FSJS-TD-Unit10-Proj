import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import { Provider } from './Context'; // Context provider for state management
import App from './App'; // Main app component
import reportWebVitals from './reportWebVitals'; // Web vitals reporting utility

// Create a root container for the React application using the new React 18 API.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component wrapped inside the Provider component.
// The Provider component manages the global state and context for the app.
root.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
