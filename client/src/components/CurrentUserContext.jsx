import React, { createContext, useState, useEffect } from 'react';

const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch('/api/check-session')
      .then(response => {
        if (response.status === 200) {
          response.json()
      .then(loggedInUser => setCurrentUser(loggedInUser));
        }
      });
  }, []);

  const logout = () => {
    setCurrentUser(null);
    fetch('/api/logout', { method: 'DELETE' });
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser, logout }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
