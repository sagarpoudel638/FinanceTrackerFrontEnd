import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
 const Header = () => {
    const user = false
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Finance Tracker</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
           {user?<Navbar.Text>
            Signed in as: {user}
          </Navbar.Text>: <Button variant="primary">Login</Button>}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;
