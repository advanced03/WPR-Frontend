import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../style/navbar.css';

function FoNavbar() {
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
            {location.pathname !== '/Profiel' && (
              <Nav.Link className="hover" onClick={() => handleNavigation('/Profiel')}>
                Profiel
              </Nav.Link>
            )}
            {location.pathname !== '/FoVoertuigInname' && (
              <Nav.Link className="hover" onClick={() => handleNavigation('/FoVoertuigInname')}>
                Voertuig inname registreren
              </Nav.Link>
            )}
            {location.pathname !== '/FoVOertuigUitgifte' && (
              <Nav.Link className="hover" onClick={() => handleNavigation('/FoVOertuigUitgifte')}>
                Voertuig uitgifte registreren
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default FoNavbar;
