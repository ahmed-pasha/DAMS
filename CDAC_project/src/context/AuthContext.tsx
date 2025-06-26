import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  regenerateSharingCode: () => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isError: false,
    isSuccess: false,
    message: '',
  });

  useEffect(() => {
    // Check if user is logged in on component mount
    const user = localStorage.getItem('user');
    if (user) {
      setState(prev => ({
        ...prev,
        user: JSON.parse(user),
        isLoading: false,
      }));
    } else {
      setState(prev => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, []);

  const register = async (name: string, email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const response = await axios.post('/api/users', {
        name,
        email,
        password,
      });

      localStorage.setItem('user', JSON.stringify(response.data));
      
      setState({
        user: response.data,
        isLoading: false,
        isError: false,
        isSuccess: true,
        message: 'Registration successful!',
      });
    } catch (error: any) {
      setState({
        user: null,
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: error.response?.data?.message || 'Registration failed',
      });
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const response = await axios.post('/api/users/login', {
        email,
        password,
      });

      localStorage.setItem('user', JSON.stringify(response.data));
      
      setState({
        user: response.data,
        isLoading: false,
        isError: false,
        isSuccess: true,
        message: 'Login successful!',
      });
    } catch (error: any) {
      setState({
        user: null,
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: error.response?.data?.message || 'Login failed',
      });
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setState({
      user: null,
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: '',
    });
  };

  const regenerateSharingCode = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${state.user?.token}`,
        },
      };

      const response = await axios.put('/api/users/regenerate-code', {}, config);
      
      // Update user in localStorage and state
      const updatedUser = {
        ...state.user!,
        sharingCode: response.data.sharingCode,
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setState(prev => ({
        ...prev,
        user: updatedUser,
        isLoading: false,
        isSuccess: true,
        message: 'Sharing code regenerated!',
      }));

      return response.data.sharingCode;
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        isError: true,
        message: error.response?.data?.message || 'Failed to regenerate code',
      }));
      throw new Error(error.response?.data?.message || 'Failed to regenerate code');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        regenerateSharingCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};