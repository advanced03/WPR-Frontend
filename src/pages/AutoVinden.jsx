import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ButtonGroup } from 'react-bootstrap';
import '../style/huren.css';
import '../style/knop.css';
import PartNavbar from "../components/PartNavbar.jsx";

// Mock data voor voertuigen
const wagens = [
  { VoertuigId: 1, Merk: 'Ford', model: 'Fiesta', kleur: 'Blauw', type: 'auto' },
  { VoertuigId: 2, Merk: 'Volkswagen', model: 'Golf', kleur: 'Geel', type: 'auto' },
  { VoertuigId: 3, Merk: 'Opel', model: 'Corsa', kleur: 'Zwart', type: 'auto' },
  { VoertuigId: 4, Merk: 'Hobby', model: 'DeLuxe', kleur: 'Wit', type: 'caravan' },
  { VoertuigId: 5, Merk: 'Winnebago', model: 'Vista', kleur: 'Grijs', type: 'camper' },
];

const AutoVinden = () => {
  const [selectedType, setSelectedType] = useState('auto');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSelect = (type) => {
    setSelectedType(type);
  };

  const handleGoBack = () => {
    navigate('/AutoZoeken'); // Navigeren naar de vorige stap
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredWagens = wagens.filter(wagen => 
    wagen.type === selectedType && 
    (wagen.Merk.toLowerCase().includes(searchTerm.toLowerCase()) || 
     wagen.model.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="achtergrond2">
      <PartNavbar />
      <Container fluid className="p-2 my-4">
        <h1 className="pagina-titel text-center my-4">Kies een Voertuig om te Huren</h1>

        <div className="d-flex justify-content-center mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="Zoek voertuigen..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: '300px' }}
          />
        </div>

        {/* ButtonGroup */}
        <div className="d-flex justify-content-center mb-4">
          <ButtonGroup className="mt-5 knoppengroep">
            <Button
              variant={selectedType === 'auto' ? 'secondary' : 'outline-light'}
              onClick={() => handleSelect('auto')}
            >
              Auto 🚗
            </Button>
            <Button
              variant={selectedType === 'caravan' ? 'secondary' : 'outline-light'}
              onClick={() => handleSelect('caravan')}
            >
              Caravan ⛺
            </Button>
            <Button
              variant={selectedType === 'camper' ? 'secondary' : 'outline-light'}
              onClick={() => handleSelect('camper')}
            >
              Camper 🚐
            </Button>
          </ButtonGroup>
        </div>

        {/* Vehicle Grid */}
        <Row className="my-5 p-5 autovinden">
          {filteredWagens.map(wagen => (
            <Col key={wagen.VoertuigId} sm={12} md={6} lg={4} className="mb-4">
              <Card className="h-100 p-2 mb-3">
                <Card.Img
                  variant="top"
                  src={`src/logos/${wagen.Merk.toLowerCase()}.png`}
                  className="car-image"
                />
                <Card.Body>
                  <Card.Title>{wagen.Merk} {wagen.model}</Card.Title>
                  <p>Kleur: {wagen.kleur}</p>
                  <Button className="knop mt-3">Huren 🚗</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default AutoVinden;
