import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../style/navbar.css';

function BoNavbar() {
  const navigate = useNavigate();

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
            <Nav.Link className="hover" onClick={() => handleNavigation('/Home')}>Homepagina</Nav.Link>
            <Nav.Link className="hover" onClick={() => handleNavigation('/Profiel')}>Profiel</Nav.Link>
            <Nav.Link className="hover" onClick={() => handleNavigation('/BoHuurVerzoekBehandeling')}>Huurverzoeken behandelen</Nav.Link>
            <Nav.Link className="hover" onClick={() => handleNavigation('/BoSchadeRegister')}>Reparatiestatus aanpassen</Nav.Link>
            <Nav.Link className="hover" onClick={() => handleNavigation('/BoRegister')}>Medewerkeraccount aanmaken</Nav.Link>
            <Nav.Link className="hover" onClick={() => handleNavigation('/BoWagenparkbeheer')}>Wagenpark Beheren</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BoNavbar;
