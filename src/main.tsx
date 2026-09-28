import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { PwaUpdatePrompt } from './components/PwaUpdatePrompt';
import { LimiteDeError } from './components/LimiteDeError';
import { instalarModalA11y } from './services/modalA11y';
import { iniciarConsentimiento } from './services/consentimiento';
import { AvisoCookies } from './components/AvisoCookies';
import './index.css';
import './App.css';

// Set up your Google OAuth Client ID in .env.local:
// VITE_GOOGLE_CLIENT_ID=your_client_id_here
//
// To create one:
// 1. Go to https://console.cloud.google.com/
// 2. Create a project → APIs & Services → Credentials
// 3. Create OAuth 2.0 Client ID (Web application)
// 4. Add Authorized JavaScript origins: http://localhost:3001
// 5. Copy the Client ID here
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

// Diálogo accesible, Escape, foco atrapado y animación de salida para todos los modales
instalarModalA11y();

// Analytics solo si ya se aceptó en una visita anterior
iniciarConsentimiento();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider>
        <AuthProvider>
          <LimiteDeError zona="la plataforma">
            <App />
          </LimiteDeError>
          <PwaUpdatePrompt />
          <AvisoCookies />
        </AuthProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
