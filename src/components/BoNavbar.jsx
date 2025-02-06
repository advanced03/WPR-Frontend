// Import statements
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import '../style/navbar.css';

function BoNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Functie om te navigeren
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Functie om uit te loggen
  const handleLogout = () => {
    sessionStorage.removeItem('jwtToken');  // Verwijder het token uit sessionStorage
    navigate('/Login');  // Navigeer de gebruiker naar de loginpagina
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
            {location.pathname !== '/BoHuurVerzoekBehandeling' && (
              <Nav.Link className="hover" onClick={() => handleNavigation('/BoHuurVerzoekBehandeling')}>
                Openstaande huurverzoeken
              </Nav.Link>
            )}
            {location.pathname !== '/BoRegister' && (
              <Nav.Link className="hover" onClick={() => handleNavigation('/BoRegister')}>
                Front/Backoffice aanmaken
              </Nav.Link>
            )}
            {location.pathname !== '/BoWagenparkbeheer' && (
              <Nav.Link className="hover" onClick={() => handleNavigation('/BoWagenparkbeheer')}>
                Eigen Wagenpark Beheren
              </Nav.Link>
            )}
            {location.pathname !== '/BoWagenparkBehandeling' && (
              <Nav.Link className="hover" onClick={() => handleNavigation('/BoWagenparkBehandeling')}>
                Openstaande wagenparkverzoeken
              </Nav.Link>
            )}
            {location.pathname !== '/BoSchadeRegister' && (
              <Nav.Link className="hover" onClick={() => handleNavigation('/BoSchadeRegister')}>
                Schade Register
              </Nav.Link>
            )}
          </Nav>

          <Nav className="ms-auto">
            <Nav.Link className="hover privacy" onClick={() => handleNavigation('/Privacy')}>
              Privacyverklaring
            </Nav.Link>

            <Nav.Link variant="link" className="hover privacy ms-3" onClick={handleLogout}>
              Log uit
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BoNavbar;
