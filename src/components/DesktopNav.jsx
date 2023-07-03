import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

function DesktopNav() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <img src={require("../assets/logo.png")} />
          <img className="ms-3" src={require("../assets/logo-text.png")} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Search Candidate</Nav.Link>
            <Nav.Link href="#link">Post New Job</Nav.Link>
            <NavDropdown title="My Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                View Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Edit Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Security</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Privacy</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default DesktopNav;
