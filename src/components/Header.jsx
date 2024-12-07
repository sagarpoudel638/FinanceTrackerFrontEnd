import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import NavDropdown from "react-bootstrap/NavDropdown";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons/faChartLine";

const Header = () => {
  // const user = false
  const { user, logout } = useAuth();
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Finance Tracker</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {user ? (
            <>
              <Link to="/dashboard">
                <FontAwesomeIcon icon={faChartLine} /> Dashboard
              </Link> &nbsp; &nbsp;&nbsp; &nbsp;
              <Link to="/transactions">
                <FontAwesomeIcon icon={faBuildingColumns} /> Transactions
              </Link> &nbsp; &nbsp; &nbsp; &nbsp;
              <NavDropdown
                title={`Signed in as: ${user}`}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#profile" disabled>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#settings" disabled>
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <Link to="/login">
              <Button variant="primary">Login</Button>
            </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
