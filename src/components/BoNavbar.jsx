import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import '../style/navbar.css';

function BoNavbar() { // Navigatie methode IPV Html link voor snellere laadtijden.
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Als het pad overeenkomt met het pad waar de gebruiker zich al bevindt, laat die link niet zien in de navigatiebalk.
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
            {location.pathname !== '/BoHuurVerzoekBehandeling' && (
              <Nav.Link className="hover" onClick={() => handleNavigation('/BoHuurVerzoekBehandeling')}>
                Huurverzoeken behandelen
              </Nav.Link>
            )}
            {location.pathname !== '/BoRegister' && (
              <Nav.Link className="hover" onClick={() => handleNavigation('/BoRegister')}>
                Front/Backoffice aanmaken
              </Nav.Link>
            )}
            {location.pathname !== '/BoWagenparkbeheer' && (
              <Nav.Link className="hover" onClick={() => handleNavigation('/BoWagenparkbeheer')}>
                Wagenpark Beheren
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

export default BoNavbar;
