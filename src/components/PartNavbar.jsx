import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import '../style/navbar.css';

function PartNavbar() { // Navigatie methode IPV Html link voor snellere laadtijden.
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Navbar expand="lg" className="navigatiebalk">
      <Container>
        <Navbar.Brand>CarAndAll</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {location.pathname !== '/Home' && (
              <Nav.Link className="hover" onClick={() => handleNavigation('/Home')}>
                Homepagina
              </Nav.Link>
            )}
            {location.pathname !== '/AutoVinden' && (
              <Nav.Link className="hover" onClick={() => handleNavigation('/AutoVinden')}>
                Voertuig huren
              </Nav.Link>
            )}
            {location.pathname !== '/Profiel' && (
              <Nav.Link className="hover" onClick={() => handleNavigation('/Profiel')}>
                Profiel
              </Nav.Link>
            )}
            {location.pathname !== '/Geschiedenis' && (
              <Nav.Link className="hover" onClick={() => handleNavigation('/Geschiedenis')}>
                Huurgeschiedenis
              </Nav.Link>
            )}
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link className="hover privacy" onClick={() => handleNavigation('/Privacy')}>
              Privacyverklaring
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default PartNavbar;
