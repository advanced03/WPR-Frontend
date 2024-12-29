import React, { useState } from 'react';
import { Container, Col, Card, Button } from 'react-bootstrap';
import '../style/backoffice.css'; // Zorg ervoor dat je dit CSS-bestand importeert

// Simulatie van 20 huurverzoeken
const initialVerzoeken = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  naam: `Klant ${index + 1}`,
  voertuig: index % 2 === 0 ? 'Ford Fiesta' : 'Volkswagen Golf', // Afwisseling van voertuigen
  adres: `Straatnaam ${index + 1}, Stad ${index + 1}`,
  rijbewijsNummer: `1234567890${index}`,
  aardVanRij: index % 2 === 0 ? 'Vakantie' : 'Zakelijk',
  versteBestemming: index % 2 === 0 ? 'Frankrijk' : 'Duitsland',
  verwachteKilometers: `${(index + 1) * 100}`,
  status: 'Wachten', // Alle verzoeken beginnen als 'Wachten'
}));

const BoHuurVerzoekBehandeling = () => {
  const [verzoeken, setVerzoeken] = useState(initialVerzoeken);

  // Functie om verzoek goed te keuren
  const goedkeuren = (id) => {
    const updatedVerzoeken = verzoeken.map((verzoek) =>
      verzoek.id === id ? { ...verzoek, status: 'Goedgekeurd' } : verzoek
    );
    setVerzoeken(updatedVerzoeken);
  };

  // Functie om verzoek af te wijzen
  const afwijzen = (id) => {
    const updatedVerzoeken = verzoeken.map((verzoek) =>
      verzoek.id === id ? { ...verzoek, status: 'Afgewezen' } : verzoek
    );
    setVerzoeken(updatedVerzoeken);
  };

  return (
    <div className="achtergrond2">
      <h1 className="text-center pagina-titel my-3">Openstaande huurverzoeken</h1>
      <Container fluid className="d-flex justify-content-center align-items-center">
        <Col md={8}>
          <Card className="huren-box p-3 mt-5">
            <Card.Body>
              <div className="verzoeken-lijst">
                {verzoeken.length > 0 ? (
                  verzoeken.map((verzoek) => (
                    <Card key={verzoek.id} className="mb-3">
                      <Card.Body>
                        <Card.Title><strong>Naam:</strong> {verzoek.naam}</Card.Title>
                        <Card.Text><strong>Voertuig:</strong> {verzoek.voertuig}</Card.Text>
                        <Card.Text><strong>Adres:</strong> {verzoek.adres}</Card.Text>
                        <Card.Text><strong>Rijbewijsnummer:</strong> {verzoek.rijbewijsNummer}</Card.Text>
                        <Card.Text><strong>Aard van de reis:</strong> {verzoek.aardVanRij}</Card.Text>
                        <Card.Text><strong>Verste bestemming:</strong> {verzoek.versteBestemming}</Card.Text>
                        <Card.Text><strong>Verwachte kilometers:</strong> {verzoek.verwachteKilometers}</Card.Text>
                        <Card.Text><strong>Status:</strong> {verzoek.status}</Card.Text>

                        <div className="d-flex justify-content-start">
                          <Button
                            className="mx-1"
                            variant="success"
                            onClick={() => goedkeuren(verzoek.id)}
                            disabled={verzoek.status !== 'Wachten'}
                          >
                            Goedkeuren
                          </Button>
                          <Button
                            className="mx-1"
                            variant="danger"
                            onClick={() => afwijzen(verzoek.id)}
                            disabled={verzoek.status !== 'Wachten'}
                          >
                            Afwijzen
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <p className="text-center">Er zijn nog geen huurverzoeken ingediend.</p>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </div>
  );
};

export default BoHuurVerzoekBehandeling;
