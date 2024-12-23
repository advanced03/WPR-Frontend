import React from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
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
      <div className="achtergrond2"></div>
      <div className="home-titel text-center">
        <h1>Welkom bij Car And All!</h1>
      </div>
      <Container>
        <Row className="justify-content-center p-4 mt-5 foto-rij">
          <Col xs={12} md={4} className="mb-4">
            <div className="home-image-container">
              <h3 className="HomeFotoTekst mt-2 text-center">Auto's</h3>
              <img src={auto} className="img-fluid p-1" alt="Auto" />
            </div>
          </Col>
          <Col xs={12} md={4} className="mb-4">
            <div className="home-image-container">
              <h3 className="HomeFotoTekst mt-2 text-center">Caravans</h3>
              <img src={caravan} className="img-fluid p-1" alt="Caravan" />
            </div>
          </Col>
          <Col xs={12} md={4} className="mb-4">
            <div className="home-image-container">
              <h3 className="HomeFotoTekst mt-2 text-center">Campers</h3>
              <img src={camper} className="img-fluid p-1" alt="Camper" />
            </div>
          </Col>
        </Row>
      </Container>

      <div className="text-center">
  <Row className="justify-content-center mx-3 mt-5">
    <Col xs={12} md={2} className="mb-2">
      <Button className="knop w-100 btn-lg" onClick={() => handleNavigation('/Login')}>Login 🔓</Button>
    </Col>
    <Col xs={12} md={2} className="mb-2">
      <Button className="knop w-100 btn-lg" onClick={() => handleNavigation('/AutoVinden')}>Login 🔓</Button>
    </Col>
  </Row>
</div>


      <div className="text-center home-inhoud">
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <h3>Over ons 🌍</h3>
              <p>
                Welkom bij Car And All! Wij bieden een uitgebreid assortiment auto's, caravans en campers tegen scherpe huurprijzen.
                Of je nu een weekendtrip plant of een langere reis, wij hebben het perfecte voertuig voor jou.
                Maak vandaag nog een account aan en begin jouw avontuur op de weg!
              </p>
            </Col>
            <Col xs={12} md={6}>
              <h3>Waarom kiezen voor Car And All? 🤔</h3>
              <ul className="list-unstyled">
                <li>✔ Groot aanbod aan voertuigen</li>
                <li>✔ Flexibele en transparante voorwaarden</li>
                <li>✔ Altijd hulp van onze vriendelijke klantenservice</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
