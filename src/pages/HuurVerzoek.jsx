import React, { useState } from 'react';
import { Container, Col, Card, Form, Button } from 'react-bootstrap';
import '../style/huren.css';

const wagens = [
  { VoertuigId: 1, Merk: 'Ford', model: 'Fiesta', kleur: 'Blauw' },
  { VoertuigId: 2, Merk: 'Volkswagen', model: 'Golf', kleur: 'Geel' },
  { VoertuigId: 3, Merk: 'Opel', model: 'Corsa', kleur: 'Zwart' },
];

const HuurVerzoek = () => {
  const [formData, setFormData] = useState({
    naam: '',
    adres: '',
    rijbewijsNummer: '',
    aardVanRij: '',
    versteBestemming: '',
    verwachteKilometers: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <div className="achtergrond2"></div>
      <div className="huren-container">
        <Container fluid>
          <h1 className="huren-titel text-center">Uw keuze:</h1>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Gegevens over de gekozen auto</Card.Title>
                {wagens.map((wagen) => (
                  <Card.Text key={wagen.VoertuigId}>
                    <strong>Merk:</strong> {wagen.Merk} <br />
                    <strong>Model:</strong> {wagen.model} <br />
                    <strong>Kleur:</strong> {wagen.kleur}
                  </Card.Text>
                ))}
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Uw persoonlijke informatie</Card.Title>
                <Form>
                  <Form.Group controlId="formNaam">
                    <Form.Label>Uw wettelijke naam</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="naam" 
                      value={formData.naam}
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group controlId="formAdres">
                    <Form.Label>Adres</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="adres" 
                      value={formData.adres}
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group controlId="formRijbewijsNummer">
                    <Form.Label>Rijbewijs documentnummer</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="rijbewijsNummer" 
                      value={formData.rijbewijsNummer}
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group controlId="formAardVanRij">
                    <Form.Label>Aard van het rij</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="aardVanRij" 
                      value={formData.aardVanRij}
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group controlId="formVersteBestemming">
                    <Form.Label>Verste bestemming</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="versteBestemming" 
                      value={formData.versteBestemming}
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group controlId="formKilometers">
                    <Form.Label>Verwachte kilometers</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="verwachteKilometers" 
                      value={formData.verwachteKilometers}
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">Opslaan</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    </div>
  );
};

export default HuurVerzoek;
