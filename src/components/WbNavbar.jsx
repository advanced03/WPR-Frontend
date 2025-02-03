import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import '../style/navbar.css';

function WbNavbar() { // Navigatie methode IPV Html link voor snellere laadtijden.
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
            {location.pathname !== '/WbAccountsBeheren' && (
              <Nav.Link className="hover" onClick={() => handleNavigation('/WbAccountsBeheren')}>
                Accounts beheren
              </Nav.Link>
            )}
            {location.pathname !== '/WbStatus' && (
              <Nav.Link className="hover" onClick={() => handleNavigation('/WbStatus')}>
                Overzicht voertuigen
              </Nav.Link>
            )}
            {location.pathname !== '/WbAbboBeheer' && (
              <Nav.Link className="hover" onClick={() => handleNavigation('/WbAbboBeheer')}>
                Abbonement kiezen/aanpassen
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

export default WbNavbar;
