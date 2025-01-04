import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Alleen cijfers toestaan en lengtebeperkingen toepassen
    if (name === "verwachteKilometers") {
      // Alleen cijfers toestaan en maximaal 5 cijfers
      if (!/^\d*$/.test(value) || value.length > 5) {
        return; // Negeer invoer als het geen cijfers zijn of als de lengte meer dan 5 is
      }
    } else if (name === "rijbewijsNummer") {
      // Alleen cijfers toestaan en maximaal 10 cijfers
      if (!/^\d*$/.test(value) || value.length > 10) {
        return; // Negeer invoer als het geen cijfers zijn of als de lengte meer dan 10 is
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleGoBack = () => {
    navigate(-1); // Gaat terug naar de vorige pagina
  };

  return (
    <>
      <div className="achtergrond2"></div>
      <h1 className="pagina-titel text-center"><br />Uw Keuze:</h1>
      <Container fluid className="d-flex justify-content-center align-items-center huren-background">
        <Col md={6}>
          <Card className='huren-box p-4 mt-5'>
            <Card.Body className="p-3">
              {wagens.map((wagen) => (
                <Card.Text className="text-center gekozen-auto mb-5 p-2" key={wagen.VoertuigId}>
                  <strong>Gekozen Auto:</strong> {wagen.Merk} {wagen.model}
                </Card.Text>
              ))}

              <Card.Title className="mb-3 p-2"><strong>Uw persoonlijke informatie</strong></Card.Title>
              <Form className="p-2">
                <Form.Group controlId="formNaam" className="p-2">
                  <Form.Label>👤 Uw wettelijke naam</Form.Label>
                  <Form.Control
                    type="text"
                    name="naam"
                    value={formData.naam}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formAdres" className="p-2">
                  <Form.Label>📍 Adres</Form.Label>
                  <Form.Control
                    type="text"
                    name="adres"
                    value={formData.adres}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formRijbewijsNummer" className="p-2">
                  <Form.Label>🪪 Rijbewijs documentnummer</Form.Label>
                  <Form.Control
                    type="text" // Houd het als type "text"
                    name="rijbewijsNummer"
                    value={formData.rijbewijsNummer}
                    onChange={handleChange}
                    maxLength={10} // Beperk het invoerveld tot maximaal 10 tekens
                  />
                </Form.Group>
                <Form.Group controlId="formAardVanRij" className="p-2">
                  <Form.Label>🏖️ Aard van het reis</Form.Label>
                  <Form.Control
                    type="text"
                    name="aardVanRij"
                    value={formData.aardVanRij}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formVersteBestemming" className="p-2">
                  <Form.Label>🌍 Verste bestemming</Form.Label>
                  <Form.Control
                    type="text"
                    name="versteBestemming"
                    value={formData.versteBestemming}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formKilometers" className="p-2">
                  <Form.Label>📏 Verwachte kilometers</Form.Label>
                  <Form.Control
                    type="text" // Houd het als type "text"
                    name="verwachteKilometers"
                    value={formData.verwachteKilometers}
                    onChange={handleChange}
                    maxLength={5} // Beperk het invoerveld tot maximaal 5 tekens
                  />
                </Form.Group>
                <div className="d-flex justify-content-center p-2">
                  <Button className='knop' type="submit">👍 Huurverzoek indienen</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Container>
      <div className="d-flex justify-content-center my-4">
        <Button className="knop" onClick={handleGoBack}>← Terug</Button>
      </div>
    </>
  );
};

export default HuurVerzoek;
