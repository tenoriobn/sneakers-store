import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from 'src/App';
import 'src/globals.css';
import { CartProvider } from './context';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
