import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../style/home.css';
import auto from '../assets/auto.png';
import caravan from '../assets/caravan.png';
import camper from '../assets/camper.png';


const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className="home-titel">
        <h1>Welkom bij Car And All!</h1>
      </div>
      <Row className="justify-content-center foto-rij">
        <Col>
          <div className="home-image-container">
            <img src={auto} className="img-fluid" alt="Auto" />
          </div>
        </Col>
        <Col>
          <div className="home-image-container">
            <img src={caravan} className="img-fluid" alt="Caravan" />
          </div>
        </Col>
        <Col>
          <div className="home-image-container">
            <img src={camper} className="img-fluid" alt="Camper" />
          </div>
        </Col>
      </Row>

      <div className="text-center">
        <Button
          variant="primary"
          className="mx-2 btn-lg home-btn"
          onClick={() => handleNavigation('/Login')}
        >
          Login
        </Button>
        <Button
          variant="primary"
          className="mx-2 my-5 btn-lg home-btn"
          onClick={() => handleNavigation('/ZakelijkRegister')}
        >
          Medewerker
        </Button>
      </div>

      <div className="text-center home-inhoud">
        <p>Huur auto's, caravans en campers! Bij Car And All hebben we een breed scala aan voertuigen voor een aantrekkelijke huurprijs. Wilt u een voertuig huren? Maak dan snel een account en begin uw rij avontuur!</p>
      </div>
    </>
  );
}

export default Home;
