// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import App from './App';

const clientId = '970460346115-cen9nq3a5ctkgv7fgnee7p566cbh7r41.apps.googleusercontent.com'; // Replace with your actual Google OAuth Client ID

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={clientId}>
    <Router>
      <App />
    </Router>
  </GoogleOAuthProvider>
);
