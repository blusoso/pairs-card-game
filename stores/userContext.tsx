import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider: React.FC = ({ children }) => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
  }, []);

  return (
    <UserContext.Provider value={[userInfo, setUserInfo]}>
      {children}
    </UserContext.Provider>
  );
};
