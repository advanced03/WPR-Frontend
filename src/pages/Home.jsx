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
      <div className='achtergrond2'></div>
      <div className="home-titel">
        <h1>Welkom bij Car And All!</h1>
      </div>
      <Row className="justify-content-center foto-rij">
        <Col>
          <div className="home-image-container">
            <h3 className='HomeFotoTekst'>Auto's</h3>
            <img src={auto} className="img-fluid" alt="Auto" />
          </div>
        </Col>
        <Col>
          <div className="home-image-container">
            <h3 className='HomeFotoTekst'>Caravans</h3>
            <img src={caravan} className="img-fluid" alt="Caravan" />
          </div>
        </Col>
        <Col>
          <div className="home-image-container">
            <h3 className='HomeFotoTekst'>Campers</h3>
            <img src={camper} className="img-fluid" alt="Camper" />
          </div>
        </Col>
      </Row>

      <div className="button-div text-center">
        <Button
          className="mx-2 btn-lg home-btn"
          onClick={() => handleNavigation('/Login')}
        >
          Login
        </Button>
        <Button
          className="btn-lg home-btn"
          onClick={() => handleNavigation('/ZakelijkRegister')}
        >
          Medewerker
        </Button>

        <div className="text-center mt-3">
          <span>
            Werkt u voor Car And All?{' '}
            <button
              onClick={() => handleNavigation('/ZakelijkRegister')}
              className="Link"
            >
              Klik hier
            </button>{' '}
            om u aan te melden voor een werknemer account.
          </span>
        </div>
      </div>

      <div className="text-center home-inhoud">
        <Row>
          <Col md={6}>
          <h3>Over ons</h3>
            <p>
              Welkom bij Car And All! Wij bieden een uitgebreid assortiment auto's, caravans en campers tegen scherpe huurprijzen.
              Of je nu een weekendtrip plant of een langere reis, wij hebben het perfecte voertuig voor jou.
              Maak vandaag nog een account aan en begin jouw avontuur op de weg!
            </p>
          </Col>
          <Col md={6}>
            <h3>Waarom kiezen voor Car And All?</h3>
            <ul className="list-unstyled">
              <li>✔ Groot aanbod aan voertuigen</li>
              <li>✔ Flexibele en transparante voorwaarden</li>
              <li>✔  Altijd hulp van onze vriendelijke klantenservice</li>
            </ul>
          </Col>
        </Row>
      </div>

    </>
  );
}

export default Home;