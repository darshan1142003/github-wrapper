import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react'; // Import Auth0Provider
import { AppProvider } from './AppProvider'; // Import AppProvider (adjust the path if necessary)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-oyksvr6nlbvyg0jz.us.auth0.com"
    clientId="xOSYGgK3VbSaHv5Igq5z6LngQnzQtUIs"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}>
    <AppProvider>    
      <App />
    </AppProvider>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
