import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../style/home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container className="home-container">
      <div className="home-titel">
        <h1>Welkom bij Car And All!</h1>
      </div>

      <Row className="justify-content-center my-4">
        <Col className="mb-4">
          <div className="home-image-container">
            <img src="src/assets/auto.png" className="img-fluid" alt="Auto" />
          </div>
        </Col>
        <Col className="mb-4">
          <div className="home-image-container">
            <img src="src/assets/caravan.png" className="img-fluid" alt="Caravan" />
          </div>
        </Col>
        <Col className="mb-4">
          <div className="home-image-container">
            <img src="src/assets/camper.png" className="img-fluid" alt="Camper" />
          </div>
        </Col>
      </Row>

      <div className="text-center my-4">
        <Button
          variant="primary"
          className="mx-2 home-btn"
          onClick={() => handleNavigation('/Login')}
        >
          Login
        </Button>
        <Button
          variant="primary"
          className="mx-2 home-btn"
          onClick={() => handleNavigation('/ZakelijkRegister')}
        >
          Medewerker
        </Button>
      </div>

      <div className="text-center my-4">
        <p>Huur auto's, caravans en campers! Bij Car And All hebben we een breed scala aan voertuigen voor een aantrekkelijke huurprijs. Wilt u een voertuig huren? Maak dan snel een account en begin uw rij avontuur!</p>
      </div>
    </Container>
  );
}

export default Home;