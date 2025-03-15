import React, { createContext, useContext, useState } from "react";
import {
  userSignup,
  userLogin,
  removeJWTtoken,
  setJWTtoken,
  getJWTtoken,
  verifyToken,
} from "./axiosHelper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

  // const autoLogin = async () => {
  //   try {
  //     const response = await verifyToken();
  //     const { username } = response.data;
  //     setUser(username);
  //   } catch (error) {
  //     const status = error?.response?.status;
  //     console.error("verifyToken response:", error);

  //     if (status === 403) {
  //       console.warn("403 Forbidden: Token is invalid or user not verified.");
  //     }

  //     localStorage.removeItem("token");
  //     setJWTtoken(null);
  //     setUser(null);
  //   }
  // };

  const autoLogin = async () => {
    const response = await verifyToken();
    if (response.status == "success") {
      setUser(response.data.user);
      console.log(response.data.user);
    }
  };
  const logout = () => {
    removeJWTtoken();
    setUser(null);
    setGlobalMessage("");
    navigate("/login");
  };

  // const login = async (loginInfo) => {
  //   try {
  //     const response = await userLogin(loginInfo);
  //     console.log(response);
  //     if (response.status == "error" && response.message.code == 403
  //       // && response.message.details == "Invalid email or password"
  //     ) {
  //       navigate("/verification");

  //     }

  //     const { user, token } = response?.data || {};

  //     setJWTtoken(token);
  //     setUser(user);
  //    await autoLogin();
  //   } catch (error) {
  //     console.log(error);
  //     const serverMessage =
  //       error?.response?.data?.error || "something went wrong";
  //     console.error("Login error:", serverMessage);

  //     throw new Error(serverMessage);
  //   }
  // };

  // const login = async (loginInfo) => {
  //   try {
  //     const response = await userLogin(loginInfo);
  //     console.log(response);
  //     const res = response.data;

  //     if (res.status === "error") {
  //       if (
  //         res.message.code === 403 ||
  //         res.message.details === "Not verified"
  //       ) {
  //         console.warn("User not verified");
  //         return { status: "error", code: 403, message: res.message.details };
  //       }
  //       console.warn("Login error:", res.message.text);
  //       return { status: "error", message: res.message.text };
  //     }

  //     const { username, token } = res.data || {};

  //     // if (!username || !token) {
  //     //   console.warn("Missing user or token");
  //     //   return { status: "error", message: "Missing user or token" };
  //     // }

  //     setJWTtoken(token);
  //     setUser(username);
  //     await autoLogin();

  //     return { status: "success", user, token };
  //   } catch (error) {
  //     const serverMessage =
  //       error?.response?.data?.error || "Something went wrong during login";

  //     console.error("Login error:", serverMessage);
  //     return { status: "error", message: serverMessage };
  //   }
  // };

  {
    /* this is earlier version*/
  }
  const login = async (loginInfo) => {
    try {
      const response = await userLogin(loginInfo);
      console.log(response)
      if (response.status =="success") {
        const { user, token } = response.data;
          setJWTtoken(token);
          setUser(user);
          await autoLogin();
          toast.success("login in successful!");
          navigate("/dashboard");
        
      } else if (response.status =="error" && response.message.details == "Not Verified"){
        navigate("/verification");
      }
      else{
        console.log("Auth context line 148, smth went wrong")
        throw new Error (" Something Went wrong");
        
      }
      
  
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
