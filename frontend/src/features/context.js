/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const signIn = (user) => {
    setIsSignedIn(true);
    setUserData(user);
  };

  const signOut = () => {
    setIsSignedIn(false);
    setUserData({});
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, userData, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
