import { createContext, useEffect, useState } from 'react';
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth';
import Cookies from 'js-cookie';



const AuthContext = createContext();
export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || 'Error en el registro';
      return { success: false, message: msg };
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || 'Credenciales inválidas';
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setLoading(false);
    Cookies.remove('token');
  };

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log('Error verifying token:', error);
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{
      signup,
      signin,
      logout,
      user,
      isAuthenticated,
      loading
    }}
    >
      {children}
    </AuthContext.Provider>
  )
};