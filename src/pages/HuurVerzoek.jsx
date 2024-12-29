import React, { useState } from 'react';
import { Container, Col, Card, Form, Button } from 'react-bootstrap';

const wagens = [
  { VoertuigId: 1, Merk: 'Ford', model: 'Fiesta', kleur: 'Blauw' }
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
    <>
      <div className="achtergrond2"></div>
      <h1 className="pagina-titel text-center"><br />Uw Keuze:</h1>
      <Container fluid className="d-flex justify-content-center align-items-center huren-background">
        <Col md={6}>
          <Card className='huren-box p-2 mt-5'>
            <Card.Body>
              {wagens.map((wagen) => (
                <Card.Text className="text-center mb-5" key={wagen.VoertuigId}>
                  <strong>Gekozen Auto:</strong> {wagen.Merk} {wagen.model}
                </Card.Text>
              ))}

              <Card.Title className="mb-3"><strong>Uw persoonlijke informatie</strong></Card.Title>
              <Form>
                <Form.Group controlId="formNaam">
                  <Form.Label>👤 Uw wettelijke naam</Form.Label>
                  <Form.Control
                    type="text"
                    name="naam"
                    value={formData.naam}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formAdres">
                  <Form.Label>📍 Adres</Form.Label>
                  <Form.Control
                    type="text"
                    name="adres"
                    value={formData.adres}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formRijbewijsNummer">
                  <Form.Label>🪪 Rijbewijs documentnummer</Form.Label>
                  <Form.Control
                    type="text"
                    name="rijbewijsNummer"
                    value={formData.rijbewijsNummer}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formAardVanRij">
                  <Form.Label>🏖️ Aard van het reis</Form.Label>
                  <Form.Control
                    type="text"
                    name="aardVanRij"
                    value={formData.aardVanRij}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formVersteBestemming">
                  <Form.Label>🌍 Verste bestemming</Form.Label>
                  <Form.Control
                    type="text"
                    name="versteBestemming"
                    value={formData.versteBestemming}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formKilometers">
                  <Form.Label>📏 Verwachte kilometers</Form.Label>
                  <Form.Control
                    type="text"
                    name="verwachteKilometers"
                    value={formData.verwachteKilometers}
                    onChange={handleChange}
                  />
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button className='knop' type="submit">👍 Huurverzoek indienen</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default HuurVerzoek;
