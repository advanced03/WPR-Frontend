import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../style/navbar.css';

function WbNavbar() {
  const navigate = useNavigate();
  const location = useLocation(); // Gebruik de useLocation hook

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
            {location.pathname !== '/Profiel' && (
              <Nav.Link className="hover" onClick={() => handleNavigation('/Profiel')}>
                Profiel
              </Nav.Link>
            )}
            {location.pathname !== '/WbAccountsBeheren' && (
              <Nav.Link className="hover" onClick={() => handleNavigation('/WbAccountsBeheren')}>
                Accounts beheren
              </Nav.Link>
            )}
            {location.pathname !== '/WbRegister' && (
              <Nav.Link className="hover" onClick={() => handleNavigation('/WbRegister')}>
                Gebruikers registreren
              </Nav.Link>
            )}
            {location.pathname !== '/WbStatus' && (
              <Nav.Link className="hover" onClick={() => handleNavigation('/WbStatus')}>
                Overzicht voertuigen
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default WbNavbar;
