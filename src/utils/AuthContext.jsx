import React, { createContext, useContext, useState } from "react";
import {
  userSignup,
  userLogin,
  removeJWTtoken,
  setJWTtoken,
  getJWTtoken,
  verifyToken,
} from "./axiosHelper";
import {  useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  const [globalMessage, setGlobalMessage] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const signup = async (signupInfo) => {
    try {
      const response = await userSignup(signupInfo);
      console.log(response);
      //const{name} = response.data;
      // setUser(name);
    } catch (error) {
      console.log(`Sign Up failed :${error}`);
      throw new Error("Sign Up  failed. Please check your credentials.");
    }
  };

  const autoLogin = async () => {
    const response = await verifyToken();
    if (response.status == "success") {
      setUser(response.data.user);
      console.log(response.data.user)
    }
  };
  const logout = () => {
    removeJWTtoken();
    setUser(null);
    navigate("/login");
  };
  const login = async (loginInfo) => {
    try {
      const response = await userLogin(loginInfo);
      console.log(response.data);
      const { user, token } = response.data;
      setJWTtoken(token);
      setUser(user);
      
    } catch (error) {
      console.log(`Login in failed :${error}`);
      throw new Error("login in  failed. Please check your credentials.");
    }
  };

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
