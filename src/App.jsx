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
import LandingPage from "./pages/LandingPage.jsx";

function App() {
  const { autoLogin, globalMessage, setGlobalMessage } = useAuth();
  useEffect(() => {
    autoLogin().catch(err => console.error("Autologin failed:", err));
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
      <Route path="/" element={<LandingPage />} />
        <Route path="/" element={<DefaultLayout/>}>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
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
