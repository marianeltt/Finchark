import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { searchCompanies } from './api';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
console.log(searchCompanies("tsla"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();