import React, { useState } from 'react';
import { Container, Col, Card, Button, Modal } from 'react-bootstrap';
import '../style/backoffice.css'; // Zorg ervoor dat je dit CSS-bestand importeert

// Huurverzoeken met goedkeuren en afwijzen status
const huurverzoeken = [
  {
    id: 1,
    naam: 'Klant 1',
    voertuig: 'Ford Fiesta',
    adres: 'Straatnaam 1, Stad 1',
    rijbewijsNummer: '12345678901',
    aardVanRij: 'Vakantie',
    versteBestemming: 'Frankrijk',
    verwachteKilometers: '300',
    goedgekeurd: false, // Standaard goedgekeurd is false
    afgewezen: false, // Standaard afgewezen is false
  },
  {
    id: 2,
    naam: 'Klant 2',
    voertuig: 'Volkswagen Golf',
    adres: 'Straatnaam 2, Stad 2',
    rijbewijsNummer: '12345678902',
    aardVanRij: 'Zakelijk',
    versteBestemming: 'Duitsland',
    verwachteKilometers: '500',
    goedgekeurd: false,
    afgewezen: false,
  },
  {
    id: 3,
    naam: 'Klant 3',
    voertuig: 'Ford Fiesta',
    adres: 'Straatnaam 3, Stad 3',
    rijbewijsNummer: '12345678903',
    aardVanRij: 'Vakantie',
    versteBestemming: 'Italië',
    verwachteKilometers: '400',
    goedgekeurd: false,
    afgewezen: false,
  },
];

const BoHuurVerzoekBehandeling = () => {
  const [verzoeken, setVerzoeken] = useState(huurverzoeken);
  const [showModal, setShowModal] = useState(false); // Standaard geen modal tonen
  const [selectedVerzoek, setSelectedVerzoek] = useState(null); // Het geselecteerde verzoek dat goedgekeurd of afgewezen wordt

  // Functie om verzoek goed te keuren
  const goedkeuren = (id) => {
    const updatedVerzoeken = verzoeken.map((verzoek) =>
      verzoek.id === id ? { ...verzoek, goedgekeurd: true } : verzoek
    );
    setVerzoeken(updatedVerzoeken);
  };

  // Functie om verzoek af te wijzen
  const afwijzen = (id) => {
    const updatedVerzoeken = verzoeken.map((verzoek) =>
      verzoek.id === id ? { ...verzoek, afgewezen: true } : verzoek
    );
    setVerzoeken(updatedVerzoeken);
  };

  // Functie om de bevestigingsmodal te tonen
  const handleShowModal = (verzoek, action) => {
    setSelectedVerzoek({ verzoek, action });
    setShowModal(true);
  };

  // Functie om de modal te sluiten zonder actie
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVerzoek(null);
  };

  // Functie om actie te bevestigen en modal te sluiten
  const handleConfirmAction = () => {
    if (selectedVerzoek) {
      const { verzoek, action } = selectedVerzoek;
      if (action === 'goedgekeuren') {
        goedkeuren(verzoek.id);
      } else if (action === 'afwijzen') {
        afwijzen(verzoek.id);
      }
    }
    handleCloseModal(); // Sluit de modal na bevestiging
  };

  // Filter alleen de onbehandelde verzoeken
  const onbehandeldeVerzoeken = verzoeken.filter(
    (verzoek) => !verzoek.goedgekeurd && !verzoek.afgewezen
  );

  return (
    <div className="achtergrond2">
      <h1 className="text-center pagina-titel my-3">Openstaande huurverzoeken</h1>
      <Container fluid className="d-flex justify-content-center align-items-center">
        <Col md={8}>
          <Card className="huren-box p-3 mt-5">
            <Card.Body>
              <div className="verzoeken-lijst">
                {onbehandeldeVerzoeken.length > 0 ? (
                  onbehandeldeVerzoeken.map((verzoek) => (
                    <Card key={verzoek.id} className="mb-3">
                      <Card.Body>
                        <Card.Title><strong>Naam:</strong> {verzoek.naam}</Card.Title>
                        <Card.Text><strong>Voertuig:</strong> {verzoek.voertuig}</Card.Text>
                        <Card.Text><strong>Adres:</strong> {verzoek.adres}</Card.Text>
                        <Card.Text><strong>Rijbewijsnummer:</strong> {verzoek.rijbewijsNummer}</Card.Text>
                        <Card.Text><strong>Aard van de reis:</strong> {verzoek.aardVanRij}</Card.Text>
                        <Card.Text><strong>Verste bestemming:</strong> {verzoek.versteBestemming}</Card.Text>
                        <Card.Text><strong>Verwachte kilometers:</strong> {verzoek.verwachteKilometers}</Card.Text>

                        <div className="d-flex justify-content-start">
                          <Button
                            className="mx-1"
                            variant="success"
                            onClick={() => handleShowModal(verzoek, 'goedgekeuren')}
                          >
                            Goedkeuren
                          </Button>
                          <Button
                            className="mx-1"
                            variant="danger"
                            onClick={() => handleShowModal(verzoek, 'afwijzen')}
                          >
                            Afwijzen
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <p className="text-center">Er zijn geen openstaande huurverzoeken.    </p>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Container>

      {/* Bevestigingsmodal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Bevestiging</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Weet je zeker dat je dit verzoek wilt {selectedVerzoek ? selectedVerzoek.action : ''}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            Annuleren
          </Button>
          <Button variant="success" onClick={handleConfirmAction}>
            Bevestigen
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BoHuurVerzoekBehandeling;
