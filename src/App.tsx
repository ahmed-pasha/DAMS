import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../CDAC_project/src/context/AuthContext';
import ProtectedRoute from '../CDAC_project/src/components/ProtectedRoute';
import Login from '../CDAC_project/src/pages/Login';
import Register from '../CDAC_project/src/pages/Register';
import Dashboard from '../CDAC_project/src/pages/Dashboard';
import AssetDetails from '../CDAC_project/src/pages/AssetDetails';
import ProfilePage from '../CDAC_project/src/pages/ProfilePage';
import NotFound from '../CDAC_project/src/pages/NotFound';
import LandingPage from '../CDAC_project/src/pages/LandingPage';
import AuthModal from '../CDAC_project/src/components/AuthModal';
import PaymentGateway from '../CDAC_project/src/components/PaymentGateway';

function App() {
  const { user, isLoading } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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

  const closeModal = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
  };

  const handleSignupClick = () => {
    navigate('/payment');
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
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage onLoginClick={openLogin} onSignupClick={handleSignupClick} />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assets/:id" element={<AssetDetails />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Added required props to PaymentGateway */}
        <Route
          path="/payment"
          element={
            <PaymentGateway
              file={new File([], "dummy.txt")}
              onSuccess={() => {
                alert("Payment successful!");
                navigate("/dashboard");
              }}
              onCancel={() => {
                navigate("/");
              }}
            />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <AuthModal isOpen={isLoginOpen} onClose={closeModal} mode="login" onToggleMode={openSignup} />
      <AuthModal isOpen={isSignupOpen} onClose={closeModal} mode="signup" onToggleMode={openLogin} />
    </>
  );
}

export default App;
