import React from 'react'
import { Container, Row, Col } from "react-bootstrap";

 const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-4 mt-4">
      <Container>
        <Row className="mt-3">
          <Col className="text-center">
            <p>
              &copy; {new Date().getFullYear()} Finance tracker App. All rights reserved.
              <br />
              
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer;
