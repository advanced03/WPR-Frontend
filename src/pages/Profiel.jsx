import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader, Button, Form, FormGroup, FormControl } from 'react-bootstrap';
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
    // Hier zou je normaal de gegevens van de gebruiker ophalen uit een API
    // Voor dit voorbeeld gebruiken we standaardwaarden
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
    // Hier zou je de wijzigingen moeten opslaan naar een API
    setEditModus(false);
  };

  if (editModus) {
    return (
      <>
        <div className="achtergrond2"></div>
        <Container className="py-5">
          <Form onSubmit={handleSubmit}>
            <Row className="justify-content-center">
              <Col md={8}>
                <Card className="border-0 shadow rounded-lg mt-5">
                  <CardHeader className="bg-custom text-white border-bottom">
                    <h3 className="mb-0">Profiel Bewerken</h3>
                  </CardHeader>
                  <CardBody className="border-top">
                    <FormGroup controlId="gebruikersnaam">
                      <Form.Label>Gebruikersnaam</Form.Label>
                      <FormControl
                        type="text"
                        value={gebruiker.gebruikersnaam}
                        onChange={(e) => setGebruiker({ ...gebruiker, gebruikersnaam: e.target.value })}
                      />
                    </FormGroup>
                    <FormGroup controlId="email">
                      <Form.Label>Email</Form.Label>
                      <FormControl
                        type="email"
                        value={gebruiker.email}
                        onChange={(e) => setGebruiker({ ...gebruiker, email: e.target.value })}
                      />
                    </FormGroup>
                    <FormGroup controlId="bedrijfsemailtag">
                      <Form.Label>Bedrijfs email tag</Form.Label>
                      <FormControl
                        type="text"
                        value={gebruiker.bedrijfsemailtag}
                        onChange={(e) => setGebruiker({ ...gebruiker, bedrijfsemailtag: e.target.value })}
                      />
                    </FormGroup>
                    <FormGroup controlId="bedrijfsnaam">
                      <Form.Label>Bedrijfsnaam</Form.Label>
                      <FormControl
                        type="text"
                        value={gebruiker.bedrijfsnaam}
                        onChange={(e) => setGebruiker({ ...gebruiker, bedrijfsnaam: e.target.value })}
                      />
                    </FormGroup>
                    <FormGroup controlId="telefoonnummer">
                      <Form.Label>Telefoonnummer</Form.Label>
                      <FormControl
                        type="tel"
                        value={gebruiker.telefoonnummer}
                        onChange={(e) => setGebruiker({ ...gebruiker, telefoonnummer: e.target.value })}
                      />
                    </FormGroup>
                    <FormGroup controlId="wachtwoord">
                      <Form.Label>Wachtwoord</Form.Label>
                      <FormControl
                        type="password"
                        value={gebruiker.wachtwoord}
                        onChange={(e) => setGebruiker({ ...gebruiker, wachtwoord: e.target.value })}
                      />
                    </FormGroup>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <div className="d-flex justify-content-center mt-4">
              <Button variant="success" size="lg" className="mx-2" type="submit">Opslaan</Button>
              <Button variant="danger" size="lg" className="mx-2" onClick={() => setEditModus(false)}>Annuleren</Button>
            </div>
          </Form>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <div className="achtergrond2"></div>
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="border-0 shadow rounded-lg mt-5">
                <CardHeader className="bg-custom text-white border-bottom">
                  <h3 className="mb-0">{gebruiker.gebruikersnaam}</h3>
                </CardHeader>
                <CardBody className="border-top">
                  <p className="mb-0">Email: {gebruiker.email}</p>
                  {/* Toon de bedrijfsnaam alleen als deze ingevuld is */}
                  {gebruiker.bedrijfsnaam && <p className="mb-0">Bedrijfsnaam: {gebruiker.bedrijfsnaam}</p>}
                  {/* Toon de bedrijfsemailtag alleen als deze ingevuld is */}
                  {gebruiker.bedrijfsemailtag && <p className="mb-0">Bedrijfs email tag: {gebruiker.bedrijfsemailtag}</p>}
                  <p className="mb-0">Telefoonnummer: {gebruiker.telefoonnummer || 'N'}</p>
                  <p className="mb-0">Wachtwoord: {gebruiker.wachtwoord || 'N'}</p>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <div className="d-flex justify-content-center mt-4">
            <Button className='knop' size="lg" onClick={() => setEditModus(true)}>Wijzig</Button>
          </div>
        </Container>
      </>
    );
  }
}

export default Profiel;
