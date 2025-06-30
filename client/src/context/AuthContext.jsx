import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Intentar cargar usuario desde localStorage o backend
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/api/profile', {
        headers: { 'Authorization': `Bearer ${token}` },
        credentials: 'include',
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.id) setUser(data);
        });
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    if (token) localStorage.setItem('token', token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    fetch('http://localhost:3000/api/logout', { credentials: 'include' });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
