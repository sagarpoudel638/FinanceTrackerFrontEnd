

import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 

const LandingPage = () => {
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center mb-4">
        <h1 className="display-4">Welcome to Finance Tracker</h1>
        <p className="lead">
          Manage your finances, track your expenses, and monitor your savings with ease.
        </p>
      </div>

      <div className="d-flex justify-content-center mb-5">
        <Link to="/login" className="btn btn-primary btn-lg mx-2">
          Login
        </Link>
        <Link to="/signup" className="btn btn-secondary btn-lg mx-2">
          Sign Up
        </Link>
      </div>

      
    </div>
  );
};

export default LandingPage;
