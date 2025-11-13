import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService';
import { attachAuthToken } from '../services/api';

/*
AuthContext contract
- user: { id, name, role } | null
- token: string | null
- loading: boolean
- login(credentials): Promise<void>
- register(payload): Promise<void>
- logout(): void
- isAuthenticated: boolean
*/

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to restore session from localStorage
    const saved = localStorage.getItem('bb_auth');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed.user || null);
        setToken(parsed.token || null);
        if (parsed.token) attachAuthToken(parsed.token);
      } catch {}
    }
    setLoading(false);
  }, []);

  const persist = (next) => {
    localStorage.setItem('bb_auth', JSON.stringify(next));
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await authService.login(credentials);
      setUser(res.user);
      setToken(res.token);
      persist({ user: res.user, token: res.token });
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const res = await authService.register(payload);
      setUser(res.user);
      setToken(res.token);
      persist({ user: res.user, token: res.token });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('bb_auth');
    authService.logout();
  };

  const value = useMemo(() => ({
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token,
  }), [user, token, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
