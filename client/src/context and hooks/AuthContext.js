import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    fetch('/check_session')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Session check failed');
      })
      .then((data) => setTrainer(data))
      .catch((error) => {
        console.error(error);
        setTrainer(null);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ trainer, setTrainer }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};