import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('fp_user');
      return stored && stored !== 'undefined' ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('fp_token'));
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const { data } = await authAPI.login(credentials);
      if (data.success) {
        localStorage.setItem('fp_token', data.token);
        localStorage.setItem('fp_user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        toast.success(`Welcome back, ${data.user.name}! 👋`);
        return { success: true, role: data.user.role };
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed';
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const { data } = await authAPI.register(userData);
      if (data.success) {
        toast.success('OTP sent to your email!');
        return { success: true, email: userData.email, devOtp: data.devOtp };
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed';
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (email, otp) => {
    setLoading(true);
    try {
      const { data } = await authAPI.verifyOtp({ email, otp });
      if (data.success) {
        localStorage.setItem('fp_token', data.token);
        localStorage.setItem('fp_user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        toast.success('Account verified! Welcome to Finance Paisa 🎉');
        return { success: true };
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'OTP verification failed';
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async (email) => {
    setLoading(true);
    try {
      const { data } = await authAPI.resendOtp({ email });
      if (data.success) {
        toast.success('OTP resent successfully');
        return { success: true, devOtp: data.devOtp };
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to resend OTP';
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('fp_token');
    localStorage.removeItem('fp_user');
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateUser = (updatedUser) => {
    const newUser = { ...user, ...updatedUser };
    localStorage.setItem('fp_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, verifyOtp, resendOtp, logout, updateUser, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
