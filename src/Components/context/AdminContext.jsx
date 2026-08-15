import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Axios instance specifically for admin routes
  const api = axios.create({
    baseURL: 'http://localhost:5001/api',
  });

  // Intercept requests to add JWT token
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await api.get('/admin/me');
      if (res.data.success) {
        setIsAdminAuthenticated(true);
        setAdmin(res.data.admin);
      }
    } catch (error) {
      console.error("Session restoration failed:", error);
      logout(); // Clear invalid token
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await api.post('/admin/login', { email, password });
      
      if (res.data.success) {
        localStorage.setItem('adminToken', res.data.token);
        setIsAdminAuthenticated(true);
        setAdmin(res.data.admin);
        return { success: true };
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Invalid email or password" 
      };
    }
  };

  const logout = () => {
    setIsAdminAuthenticated(false);
    setAdmin(null);
    localStorage.removeItem('adminToken');
  };

  return (
    <AdminContext.Provider value={{ isAdminAuthenticated, admin, login, logout, loading, api }}>
      {!loading && children}
    </AdminContext.Provider>
  );
};