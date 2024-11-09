import { React, useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const {login}= useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
 


  const handleOnSubmit = async (e) => {
    e.preventDefault();

      await login(formData);
      toast.success("login in successful!");
      navigate("/dashboard");
  };

  const handleOnchange = (e)=>{
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, 
    });
  }
  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="src/assets/loginbgremove.png"
            // src="src/assets/login.jpg"
            class="img-fluid"
            alt="Phone image"
          />
        </MDBCol>

        <MDBCol col="4" md="6">
          <form onSubmit={handleOnSubmit}>
            <MDBInput
              wrapperClass="mb-4"
              name="email"
              value={formData.email}
              onChange={handleOnchange}
              label="Email address"
              id="formControlLg"
              type="email"
              size="lg"
            />
            <MDBInput
              wrapperClass="mb-4"
              name="password"
              value={formData.password}
              onChange={handleOnchange}
              label="Password"
              id="formControlLg"
              type="password"
              size="lg"
            />

            {/* <div className="d-flex justify-content-between mx-4 mb-4">
        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
        <a href="!#">Forgot password?</a>
      </div> */}

            <MDBBtn className="mb-4 w-100" size="lg">
              <MDBIcon fas icon="sign-in-alt" />
              &nbsp; &nbsp; Sign in
            </MDBBtn>
          </form>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
          </div>
          <Link to="/signup">
            <MDBBtn
              className="mb-4 w-100"
              size="lg"
              style={{ backgroundColor: "#006A4E" }}
            >
              <MDBIcon fas icon="user-plus" />
              &nbsp; &nbsp; Sign Up
            </MDBBtn>
          </Link>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
