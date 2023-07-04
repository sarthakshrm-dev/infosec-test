import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MobileNav({ menu, setShowForm, setMenu }) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleExpanded = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const handleCloseMenu = () => {
    setExpanded(false);
  };

  const handleMenuClick = (showForm, menu) => {
    setShowForm(showForm);
    setExpanded(false);
    setMenu(menu);
  };

  function handleLogout() {
    sessionStorage.clear();
    navigate("/");
  }

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      onToggle={toggleExpanded}
      className="bg-body-tertiary"
    >
      <Container className="d-flex">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          className="d-flex flex-column justify-content-between align-items-start h-100vh pt-4 pb-3 ps-4 mobile-navbar-collapse"
          id="basic-navbar-nav"
        >
          <Nav>
            <div className="close-menu" onClick={handleCloseMenu}>
              X
            </div>
            <div className="d-flex flex-column align-items-center mb-2">
              <div className="avatar mb-2">A</div>
              <h6>Dr. Arvind K</h6>
            </div>
            <Nav.Link
              onClick={() => handleMenuClick(false, "details")}
              className={`mb-2 ${menu === "details" ? "text-primary" : ""}`}
            >
              Company Details
            </Nav.Link>
            <Nav.Link
              onClick={() => handleMenuClick(true, "addJob")}
              className={`mb-2 ${menu === "addJob" ? "text-primary" : ""}`}
            >
              Add a Job
            </Nav.Link>
            <NavDropdown title="Jobs" id="basic-nav-dropdown" className="mb-2">
              <NavDropdown.Item>Posted Jobs</NavDropdown.Item>
              <NavDropdown.Item>Drafts</NavDropdown.Item>
              <NavDropdown.Item>Closed Jobs</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Applications"
              id="basic-nav-dropdown"
              className="mb-2"
            >
              <NavDropdown.Item>View Applications</NavDropdown.Item>
              <NavDropdown.Item>Shortlisted Candidates</NavDropdown.Item>
              <NavDropdown.Item>Hired Candidates</NavDropdown.Item>
              <NavDropdown.Item>Rejected Candidates</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link>Settings</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Brand>
          <Form.Control type="text" placeholder="Search Candidates" />
        </Navbar.Brand>
        <Navbar.Brand>
          <img src={require("../assets/bell 1.png")} alt="bell icon" />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default MobileNav;
