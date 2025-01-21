import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import '../style/home.css';
import auto from '../assets/auto.png';
import caravan from '../assets/caravan.png';
import camper from '../assets/camper.png';
import PartNavbar from "../components/PartNavbar.jsx";

const Home = () => {
  return (
    <div className="achtergrond2">
      <PartNavbar />
      <h1 className="pagina-titel text-center my-5">Welkom bij Car And All!</h1>

      <Container className="text-center">
        <Row className="justify-content-center">
          <Col xs={12} md={4} className="my-4">
            <div className="home-image-container">
              <h3 className="HomeFotoTekst mt-2">Auto's</h3>
              <img src={auto} className="img-fluid p-1" alt="Auto" />
            </div>
          </Col>
          <Col xs={12} md={4} className="my-4">
            <div className="home-image-container">
              <h3 className="HomeFotoTekst mt-2">Caravans</h3>
              <img src={caravan} className="img-fluid p-1" alt="Caravan" />
            </div>
          </Col>
          <Col xs={12} md={4} className="my-4">
            <div className="home-image-container">
              <h3 className="HomeFotoTekst mt-2">Campers</h3>
              <img src={camper} className="img-fluid p-1" alt="Camper" />
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="home-inhoud text-center p-5 my-5">
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
  );
};

export default Home;
