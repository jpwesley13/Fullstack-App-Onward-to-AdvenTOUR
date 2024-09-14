import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true); 

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
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ trainer, setTrainer, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};