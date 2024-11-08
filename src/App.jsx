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

function App() {
  const { globalMessage, setGlobalMessage } = useAuth();
  useEffect(() => {
    if (globalMessage) {
      toast(globalMessage);
      setGlobalMessage(null);
    }
  }, [globalMessage]);
  return (
    <>
      <Routes>
        <Route path="*" element={<DefaultLayout/>}>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;
