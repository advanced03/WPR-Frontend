import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../style/huren.css';
import '../style/knop.css';

// Mock data voor auto's
const wagens = [
  { VoertuigId: 1, Merk: 'Ford', model: 'Fiesta', kleur: 'Blauw' },
  { VoertuigId: 2, Merk: 'Volkswagen', model: 'Golf', kleur: 'Geel' },
  { VoertuigId: 3, Merk: 'Opel', model: 'Corsa', kleur: 'Zwart' },
];

const AutoVinden = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/AutoZoeken'); // Navigeren naar de vorige stap
  };

  return (
    <>
      <div className="achtergrond2"></div>
      <Container fluid>
        <h1 className="pagina-titel text-center my-4">Kies een Auto om te Huren</h1>
        <Row className="my-5 p-5 autovinden">
          {wagens.map(wagen => (
            <Col key={wagen.VoertuigId} sm={12} md={6} lg={4} className="my-5">
              <Card className="h-100 p-2">
                <Card.Img variant="top" src={`src/logos/${wagen.Merk.toLowerCase()}.png`} className="car-image" />
                <Card.Body>
                  <Card.Title>{wagen.Merk} {wagen.model}</Card.Title>
                  <p>Kleur: {wagen.kleur}</p>
                  <Button className="knop mt-3">Huren 🚗</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="d-flex justify-content-center my-4">
          <Button className="knop" onClick={handleGoBack}>
            ← Terug
          </Button>
        </div>
      </Container>
    </>
  );
};

export default AutoVinden;
