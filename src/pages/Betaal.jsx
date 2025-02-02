import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';

const Betalen = () => {
  // States initialiseren
  const [bedrag, setBedrag] = useState('');
  const [kaartNummer, setKaartNummer] = useState('');
  const [vervalDatum, setVervalDatum] = useState('');
  const [cvv, setCvv] = useState('');
  const [fout, setFout] = useState('');
  const [huurKosten, setHuurKosten] = useState(0);

  const handleVerzenden = (e) => {
    e.preventDefault();
    if (!bedrag || !kaartNummer || !vervalDatum || !cvv) {
      setFout('Alle velden moeten worden ingevuld!');
      return;
    }
    setFout('');
    // Stel de verwachte huurkosten in
    setHuurKosten(bedrag * 0.15); // Bijvoorbeeld: 15% van het ingevoerde bedrag als huurprijs
    alert('Betaling verzonden!');
  };

  return (
    <div className="achtergrond2" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card>
              <Card.Header className="text-center">
                <h4>Betalingspagina (Kredietkaart)</h4>
              </Card.Header>
              <Card.Body>
                {fout && <Alert variant="danger">{fout}</Alert>}
                <Form onSubmit={handleVerzenden}>
                  <Form.Group controlId="formBedrag" className="mb-3">
                    <Form.Label>Bedrag (€)</Form.Label>
                    <Form.Control
                      type="number"
                      value={bedrag}
                      onChange={(e) => setBedrag(e.target.value)}
                      placeholder="Vul het bedrag in"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formKaartNummer" className="mb-3">
                    <Form.Label>Kaartnummer</Form.Label>
                    <Form.Control
                      type="text"
                      value={kaartNummer}
                      onChange={(e) => setKaartNummer(e.target.value)}
                      placeholder="Vul je kaartnummer in"
                      required
                    />
                  </Form.Group>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="formVervalDatum">
                        <Form.Label>Vervaldatum</Form.Label>
                        <Form.Control
                          type="text"
                          value={vervalDatum}
                          onChange={(e) => setVervalDatum(e.target.value)}
                          placeholder="MM/YY"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formCvv">
                        <Form.Label>CVV</Form.Label>
                        <Form.Control
                          type="text"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          placeholder="CVV"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button type="submit" className="w-100 mt-3 knop">
                    Betalen
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {huurKosten > 0 && (
          <Row className="mt-4 justify-content-center">
            <Col md={6}>
              <Card>
                <Card.Body>
                  <h5>Verwachte huurkosten:</h5>
                  <p>€{huurKosten.toFixed(2)}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Betalen;
