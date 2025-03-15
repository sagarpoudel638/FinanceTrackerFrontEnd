import { useState, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import { Routes,Route } from "react-router-dom";
import Signup  from "./pages/Signup.jsx";
import { DefaultLayout } from "./components/layout/DefaultLayout.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "./utils/AuthContext.jsx";
import Transactions from "./pages/Transactions.jsx";
import ProductsDemo from "./pages/TestPage.jsx";
import VerifyEmail from "./components/VerifyEmail.jsx";
import VerifyEmailPage from "./pages/VerifyEmailPage.jsx"


function App() {
  const { autoLogin, globalMessage, setGlobalMessage } = useAuth();
  useEffect(() => {
    const token = localStorage.getItem("accessJWT");
  
    if (!token) {
      console.log("No token found. Skipping autoLogin.");
      return;
    }
    autoLogin().catch(err => {
      console.error("AutoLogin failed:", err);
     
      
    });
  }, []);
  
  useEffect(() => {
    if (globalMessage) {
      toast(globalMessage);
      setGlobalMessage(null);
    }
  }, [globalMessage]);
  return (
    <>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verification" element={<VerifyEmailPage />} /> 

        <Route path="/" element={<DefaultLayout/>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="test" element={<ProductsDemo />} />

        </Route>
      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;
