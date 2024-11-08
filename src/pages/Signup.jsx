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

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnsubmit = async (e) => {
    e.preventDefault();

      await signup(formData);
      toast.success("Sign up successful!");
      navigate("/login");

    
  
  };

  const handleOnchange = (e)=>{
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, 
    });
  }
  return (
    <MDBContainer fluid>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <MDBRow>
            
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign up
                </p>
                <form onSubmit={handleOnsubmit}>
                <div className="d-flex flex-row align-items-center mb-4 ">
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

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    name="email"
                    value={formData.email}
                    onChange={handleOnchange}
                    label="Your Email"
                    id="form2"
                    type="email"
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    name="password"
                    value={formData.password}
                    onChange={handleOnchange}
                    label="Password"
                    id="form3"
                    type="password"
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size="lg" />
                  <MDBInput
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleOnchange}
                    label="Repeat your password"
                    id="form4"
                    type="password"
                  />
                </div>

                <MDBBtn
                  className="mb-4"
                  size="lg"
                  type="submit"
                  style={{ backgroundColor: "#006A4E" }}
                >
                  Register
                </MDBBtn>
                </form>
              </MDBCol>
            

            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage src="src/assets/financeTracker.png" fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Signup;
