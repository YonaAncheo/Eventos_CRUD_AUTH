import { createContext, useState } from 'react';
import { registerRequest, loginRequest } from '../api/auth';


const AuthContext = createContext();
export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response.data);
    }
  };  

  return (
    <AuthContext.Provider value={{
        signup,
        signin,
        user,
        isAuthenticated,
        
      }}
    >
      {children}
    </AuthContext.Provider>
  )
};