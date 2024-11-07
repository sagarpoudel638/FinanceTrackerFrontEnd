import { useState } from "react";
import "./App.css";
import { Routes,Route } from "react-router-dom";
import Signup  from "./pages/Signup.jsx";
import { DefaultLayout } from "./components/layout/DefaultLayout.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<DefaultLayout/>}>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
