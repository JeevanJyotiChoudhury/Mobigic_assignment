import React, { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [isAuth, setisAuth] = useState(false);
  const [token, setToken] = useState(null);

  const loginUser = (token) => {
    setToken(token);
    setisAuth(true);
    localStorage.setItem("userToken", token); 
  };

  const logoutUser = () => {
    setToken("");
    setisAuth(false);
    localStorage.removeItem("userToken");
  };

  return (
    <AuthContext.Provider
      value={{ authState: { isAuth, token }, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
