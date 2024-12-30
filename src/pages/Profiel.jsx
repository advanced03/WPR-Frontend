import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import PartNavbar from "../components/PartNavbar.jsx";

function Profiel() {
  const [gebruiker, setGebruiker] = useState({
    gebruikersnaam: '',
    email: '',
    bedrijfsemailtag: '',
    bedrijfsnaam: '',
    telefoonnummer: '',
    wachtwoord: ''
  });

  const [editModus, setEditModus] = useState(false);

  useEffect(() => {
    // Mock data voor gebruiker
    setGebruiker({
      gebruikersnaam: 'Jan Janssen',
      email: 'jan.janssen@example.com',
      bedrijfsemailtag: '@example.com',
      bedrijfsnaam: 'Bedrijf B.V.',
      telefoonnummer: '+31 123456789',
      wachtwoord: 'wachtwoord123'
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Wijzigingen opgeslagen:', gebruiker);
    setEditModus(false);
  };

  return (
    <div className="achtergrond2">
      <PartNavbar />
      <h1 className="pagina-titel text-center mt-5">Mijn profiel</h1>
      <Container className="py-5">
        {editModus ? (
          <Form onSubmit={handleSubmit}>
            <Row className="justify-content-center">
              <Col md={8}>
                <Card className="border-0 shadow rounded-lg mt-5">
                  <Card.Header className="bg-custom text-white border-bottom">
                    <h3 className="mb-0">Profiel Bewerken</h3>
                  </Card.Header>
                  <Card.Body>
                    <FormGroup controlId="gebruikersnaam">
                      <FormLabel>Gebruikersnaam</FormLabel>
                      <FormControl
                        type="text"
                        value={gebruiker.gebruikersnaam}
                        onChange={(e) => setGebruiker({ ...gebruiker, gebruikersnaam: e.target.value })}
                      />
                    </FormGroup>
                    <FormGroup controlId="email">
                      <FormLabel>Email</FormLabel>
                      <FormControl
                        type="email"
                        value={gebruiker.email}
                        onChange={(e) => setGebruiker({ ...gebruiker, email: e.target.value })}
                      />
                    </FormGroup>
                    <FormGroup controlId="bedrijfsemailtag">
                      <FormLabel>Bedrijfs email tag</FormLabel>
                      <FormControl
                        type="text"
                        value={gebruiker.bedrijfsemailtag}
                        onChange={(e) => setGebruiker({ ...gebruiker, bedrijfsemailtag: e.target.value })}
                      />
                    </FormGroup>
                    <FormGroup controlId="bedrijfsnaam">
                      <FormLabel>Bedrijfsnaam</FormLabel>
                      <FormControl
                        type="text"
                        value={gebruiker.bedrijfsnaam}
                        onChange={(e) => setGebruiker({ ...gebruiker, bedrijfsnaam: e.target.value })}
                      />
                    </FormGroup>
                    <FormGroup controlId="telefoonnummer">
                      <FormLabel>Telefoonnummer</FormLabel>
                      <FormControl
                        type="tel"
                        value={gebruiker.telefoonnummer}
                        onChange={(e) => setGebruiker({ ...gebruiker, telefoonnummer: e.target.value })}
                      />
                    </FormGroup>
                    <FormGroup controlId="wachtwoord">
                      <FormLabel>Wachtwoord</FormLabel>
                      <FormControl
                        type="password"
                        value={gebruiker.wachtwoord}
                        onChange={(e) => setGebruiker({ ...gebruiker, wachtwoord: e.target.value })}
                      />
                    </FormGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <div className="d-flex justify-content-center mt-5">
              <Button variant="success" size="lg" className="mx-2" type="submit">
                Opslaan
              </Button>
              <Button
                variant="danger"
                size="lg"
                className="mx-2"
                onClick={() => setEditModus(false)}
              >
                Annuleren
              </Button>
            </div>
          </Form>
        ) : (
          <>
            <Row className="justify-content-center">
              <Col md={8}>
                <Card className="border-0 shadow rounded-lg mt-5">
                  <Card.Header className="bg-custom text-white border-bottom">
                    <h3 className="mb-0">{gebruiker.gebruikersnaam}</h3>
                  </Card.Header>
                  <Card.Body>
                    <p className="mb-0">Email: {gebruiker.email}</p>
                    {gebruiker.bedrijfsnaam && <p className="mb-0">Bedrijfsnaam: {gebruiker.bedrijfsnaam}</p>}
                    {gebruiker.bedrijfsemailtag && <p className="mb-0">Bedrijfs email tag: {gebruiker.bedrijfsemailtag}</p>}
                    <p className="mb-0">Telefoonnummer: {gebruiker.telefoonnummer || 'N.v.t.'}</p>
                    <p className="mb-0">Wachtwoord: {gebruiker.wachtwoord || 'N.v.t.'}</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <div className="d-flex justify-content-center mt-5">
              <Button className="knop" size="lg" onClick={() => setEditModus(true)}>
                Wijzig
              </Button>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}

export default Profiel;
