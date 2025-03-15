import { React, useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { toast } from "react-toastify";
import loginImage from "../assets/login.jpg";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // const handleOnSubmit = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     const result = await login(formData);
  //     console.log("Result from login():", result);
  
  //     if (!result) {
  //       toast.error("Unexpected error occurred.");
  //       return;
  //     }
  
  //     if (result.status === "success") {
  //       toast.success("Login successful!");
  //       navigate("/dashboard");
  //     } else if (result.code === 403 || result.message === "Not verified") {
  //       toast.error("Please verify your email first!");
  //       navigate("/verification");
  //     } else {
  //       toast.error(result.message || "Login failed");
  //     }
  //   } catch (error) {
  //     console.error("Catch block error:", error);
  
  //     if (error.message === "Email not verified. Please check your inbox!") {
  //       toast.warning(error.message);
  //     } else {
  //       toast.error(error.message);
  //     }
  //   }
  // };
  

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formData);
    } catch (error) {
      toast.error("Login Failed")
      console.log(error,"login error")
    }  
    
     
      
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1F7CEC, #00b894)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <MDBContainer
        className="d-flex justify-content-center align-items-center"
        style={{ maxWidth: "900px" }}
      >
        <MDBRow
          className="g-0 shadow-lg rounded-4 bg-white overflow-hidden"
          style={{ width: "100%" }}
        >
          {/* Left Image Section */}
          <MDBCol md="6" className="d-none d-md-block">
            <img
              src={loginImage}
              alt="login"
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </MDBCol>

          {/* Right Form Section */}
          <MDBCol
            md="6"
            className="p-5 d-flex flex-column justify-content-center"
          >
            <h3
              className="text-center mb-4 fw-bold"
              style={{ color: "#00b894" }}
            >
              Finance Tracker
            </h3>

            <form onSubmit={handleOnSubmit}>
              {/* Email Input */}
              <MDBInput
                wrapperClass="mb-4"
                name="email"
                value={formData.email}
                onChange={handleOnchange}
                label="Email address"
                id="emailInput"
                type="email"
                size="lg"
              />

              {/* Password Input with Toggle */}
              <div
                className="position-relative mb-4"
                style={{ display: "flex", alignItems: "center" }}
              >
                <MDBInput
                  name="password"
                  value={formData.password}
                  onChange={handleOnchange}
                  label="Password"
                  id="passwordInput"
                  type={showPassword ? "text" : "password"}
                  size="lg"
                  className="w-100"
                />
                <span
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "20px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#aaa",
                  }}
                >
                  <MDBIcon fas icon={showPassword ? "eye-slash" : "eye"} />
                </span>
              </div>

              {/* Login Button */}
              <MDBBtn
                type="submit"
                className="mb-4 w-100"
                size="lg"
                style={{
                  backgroundColor: "#00b894",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  transition: "0.3s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#019870")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#00b894")}
              >
                <MDBIcon fas icon="sign-in-alt" /> &nbsp; Sign In
              </MDBBtn>
            </form>

            {/* Divider */}
            <div className="divider d-flex align-items-center my-4">
              <hr style={{ flex: 1 }} />
              <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              <hr style={{ flex: 1 }} />
            </div>

            {/* Sign Up Button */}
            <Link to="/signup">
              <MDBBtn
                className="w-100"
                size="lg"
                style={{
                  backgroundColor: "#a2f5a2",
                  color: "#000",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  transition: "0.3s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#82e482")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#a2f5a2")}
              >
                <MDBIcon fas icon="user-plus" /> &nbsp; Sign Up
              </MDBBtn>
            </Link>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
