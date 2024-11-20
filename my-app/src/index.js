import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store.js'; 
import App from './App.js'; 
import reportWebVitals from './reportWebVitals.js';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
if (rootElement) {
  console.log("Root element found");
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}

reportWebVitals();