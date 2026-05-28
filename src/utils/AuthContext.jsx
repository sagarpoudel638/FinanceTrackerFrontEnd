import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  userSignup,
  userLogin,
  removeJWTtoken,
  setJWTtoken,
  getJWTtoken,
  verifyToken,
} from "./axiosHelper";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [globalMessage, setGlobalMessage] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const signup = async (signupInfo) => {
    const response = await userSignup(signupInfo);
    return response;
  };

  const autoLogin = async () => {
    const token = getJWTtoken();
    if (!token) return;

    try {
      const response = await verifyToken();
      if (response?.status === "success") {
        setUser(response.data.user);
      } else {
        removeJWTtoken();
        setUser(null);
      }
    } catch (err) {
      removeJWTtoken();
      setUser(null);
    }
  };

  const logout = () => {
    removeJWTtoken();
    setUser(null);
    setGlobalMessage("");
    navigate("/login");
  };

  // login() returns the full server response — callers handle navigation and toasts
  const login = async (loginInfo) => {
    const response = await userLogin(loginInfo);
    if (response.status === "success") {
      const { username, token } = response.data;
      setJWTtoken(token);
      setUser(username);
    }
    return response;
  };

  const didRun = useRef(false);
  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;
    autoLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        globalMessage,
        login,
        setGlobalMessage,
        signup,
        logout,
        autoLogin,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
