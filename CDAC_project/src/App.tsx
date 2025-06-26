import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ReceivedFilesPage from './pages/ReceivedFilesPage';
import AssetDetails from './pages/AssetDetails';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';
import LandingPage from './pages/LandingPage';
import AuthModal from './components/AuthModal';
import PaymentPage from './pages/PaymentPage';

import { useNavigate } from 'react-router-dom';

function App() {
  const { user, isLoading } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Update document title based on project name
    document.title = 'Digital Asset Management';
  }, []);

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
  };

  const openSignup = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
  };

  const openSubscribe = () => {
    navigate('/payment');
  };

  const closeModal = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage onLoginClick={openLogin} onSignupClick={openSignup} />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/received-files" element={<ReceivedFilesPage />} />
          <Route path="/assets/:id" element={<AssetDetails />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <AuthModal isOpen={isLoginOpen} onClose={closeModal} mode="login" onToggleMode={openSignup} />
      <AuthModal isOpen={isSignupOpen} onClose={closeModal} mode="signup" onToggleMode={openLogin} />
    </>
  );
}

export default App;
