import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { AssetProvider } from './context/AssetContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ErrorBoundary from './components/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <AssetProvider>
            <App />
            <ToastContainer position="top-right" autoClose={3000} />
          </AssetProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  </StrictMode>
);
