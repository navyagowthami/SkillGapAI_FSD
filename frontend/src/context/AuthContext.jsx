import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Axios instance
  const api = axios.create({
    baseURL: 'http://localhost:5001/api',
  });

  // Set token to headers
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data);
          if (res.data.theme) {
            document.documentElement.setAttribute('data-theme', res.data.theme);
          }
        } catch (err) {
          console.error('Error fetching user', err);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data);
      if (res.data.theme) {
        document.documentElement.setAttribute('data-theme', res.data.theme);
      }
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      setError(null);
      const res = await api.post('/auth/register', { name, email, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data);
      if (res.data.theme) {
        document.documentElement.setAttribute('data-theme', res.data.theme);
      }
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  const updateProfile = async (avatar, theme) => {
    try {
      const res = await api.put('/auth/profile', { avatar, theme });
      setUser(res.data);
      if (res.data.theme) {
        document.documentElement.setAttribute('data-theme', res.data.theme);
      }
      return true;
    } catch (err) {
      console.error('Failed to update profile', err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    document.documentElement.removeAttribute('data-theme');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
        api
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
