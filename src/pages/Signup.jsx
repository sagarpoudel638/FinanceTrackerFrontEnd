import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { toast } from "react-toastify";
import signUpimage from "../assets/financeTracker.png";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleOnsubmit = async (e) => {
    e.preventDefault();

    await signup(formData);
    localStorage.setItem("userEmail", formData.email);
    toast.success("Sign up successful!");
    navigate("/login");
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
      <MDBContainer style={{ maxWidth: "900px" }}>
        <MDBCard className="text-black shadow-lg" style={{ borderRadius: "25px" }}>
          <MDBCardBody className="p-md-5">
            <MDBRow className="g-0">

              {/* Left Form Section */}
              <MDBCol
                md="6"
                className="d-flex flex-column justify-content-center align-items-center"
              >
                <h3
                  className="text-center mb-4 fw-bold"
                  style={{ color: "#00b894" }}
                >
                  Create Account
                </h3>

                <form onSubmit={handleOnsubmit} style={{ width: "100%" }}>
                  {/* Name Input */}
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="user me-3" size="lg" />
                    <MDBInput
                      name="name"
                      value={formData.name}
                      onChange={handleOnchange}
                      label="Your Name"
                      id="form1"
                      type="text"
                      className="w-100"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="envelope me-3" size="lg" />
                    <MDBInput
                      name="email"
                      value={formData.email}
                      onChange={handleOnchange}
                      label="Your Email"
                      id="form2"
                      type="email"
                      className="w-100"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="d-flex flex-row align-items-center mb-4 position-relative w-100">
                    <MDBIcon fas icon="lock me-3" size="lg" />
                    <MDBInput
                      name="password"
                      value={formData.password}
                      onChange={handleOnchange}
                      label="Password"
                      id="form3"
                      type={showPassword ? "text" : "password"}
                      className="w-100"
                    />
                    <span
                      onClick={togglePasswordVisibility}
                      style={{
                        position: "absolute",
                        right: "15px",
                        cursor: "pointer",
                        color: "#aaa",
                      }}
                    >
                      <MDBIcon
                        fas
                        icon={showPassword ? "eye-slash" : "eye"}
                      />
                    </span>
                  </div>

                  {/* Confirm Password */}
                  <div className="d-flex flex-row align-items-center mb-4 position-relative w-100">
                    <MDBIcon fas icon="key me-3" size="lg" />
                    <MDBInput
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleOnchange}
                      label="Repeat your password"
                      id="form4"
                      type={showConfirmPassword ? "text" : "password"}
                      className="w-100"
                    />
                    <span
                      onClick={toggleConfirmPasswordVisibility}
                      style={{
                        position: "absolute",
                        right: "15px",
                        cursor: "pointer",
                        color: "#aaa",
                      }}
                    >
                      <MDBIcon
                        fas
                        icon={showConfirmPassword ? "eye-slash" : "eye"}
                      />
                    </span>
                  </div>

                  {/* Register Button */}
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
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#00b894")
                    }
                  >
                    <MDBIcon fas icon="user-plus" /> &nbsp; Register
                  </MDBBtn>
                </form>
              </MDBCol>

              {/* Right Image Section */}
              <MDBCol
                md="6"
                className="d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "#f8f9fa",
                  borderTopRightRadius: "25px",
                  borderBottomRightRadius: "25px",
                }}
              >
                <MDBCardImage
                  src={signUpimage}
                  alt="Finance Tracker"
                  fluid
                  style={{ maxHeight: "400px", objectFit: "contain" }}
                />
              </MDBCol>

            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default Signup;
