import React from "react";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faBuildingColumns, faBars } from "@fortawesome/free-solid-svg-icons"; // Import faBars for custom hamburger icon

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="py-3">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FontAwesomeIcon icon={faChartLine} className="me-2" />
          Finance Tracker
        </Navbar.Brand>

        {/* Custom Hamburger Icon */}
        <Navbar.Toggle aria-controls="main-navbar-nav" className="custom-navbar-toggle">
          <FontAwesomeIcon icon={faBars} className="hamburger-icon" />
        </Navbar.Toggle>

        {/* Collapsible Navbar Links */}
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto text-center">
            {user ? (
              <>
                <Nav.Link as={Link} to="/dashboard">
                  <FontAwesomeIcon icon={faChartLine} className="me-1" /> Dashboard
                </Nav.Link>

                <Nav.Link as={Link} to="/transactions">
                  <FontAwesomeIcon icon={faBuildingColumns} className="me-1" /> Transactions
                </Nav.Link>

                <NavDropdown
                  title={`Signed in as: ${user}`}
                  id="user-dropdown"
                  align="end"
                >
                  <NavDropdown.Item disabled>Profile</NavDropdown.Item>
                  <NavDropdown.Item disabled>Settings</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                <Button variant="outline-light">Login</Button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
