import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import WbNavbar from "../components/WbNavbar"

const WbAbboBeheer = () => {
  // State hooks voor het beheren van de modal en geselecteerde abonnement
  const [toonModal, setModal] = useState(false); // Toont of verbergt de modal
  const [selectedAbonnement, setSelectedAbonnement] = useState(""); // Bewaart het geselecteerde abonnement
  const [currentAbonnement, setCurrentAbonnement] = useState("Pay as You Go"); // Bewaart het huidige abonnement

  // Array van beschikbare abonnementen
  const abonnementen = [
    {
      type: "Pay as You Go", // Abonnement type
      description:
        "Betaal alleen voor het aantal dagen dat uw gebruikers een voertuig huren. Geen voorafgaande kosten.",
      kosten: "€0 per maand + huurkosten",
    },
    {
      type: "Vooraf Betaald", // Abonnement type
      description:
        "Betaal een vast bedrag per maand en geniet van voordeligere tarieven voor voertuighuur.",
      kosten: "€100 per maand + lagere huurkosten",
    },
  ];

  // Functie die wordt aangeroepen om het abonnement te wijzigen
  const handleAbonnementChange = () => {
    setCurrentAbonnement(selectedAbonnement); // Verander het huidige abonnement naar het geselecteerde abonnement
    setModal(false); // Sluit de modal na bevestiging
  };

  return (
    <div className="achtergrond2">
      <WbNavbar />

      <Container className="py-4">
        <Row className="my-4">
          <Col>
            <h1 className="pagina-titel text-center mb-5">Abonnementenbeheer</h1>
          </Col>
        </Row>

        <Row>
          {abonnementen.map((abbo, index) => (
            <Col md={6} key={index} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{abbo.type}</Card.Title>
                  <Card.Text>{abbo.description}</Card.Text>
                  <Card.Text><strong>Kosten:</strong> {abbo.kosten}</Card.Text>
                  <Button
                    className="knop"
                    onClick={() => {
                      setSelectedAbonnement(abbo.type); 
                      setModal(true);
                    }}
                  >
                    Kies dit abonnement
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center my-4 p-4 huren-box">
          <h4>Huidig abonnement: {currentAbonnement}</h4>
        </div>

        {/* Modal UI */}
        <Modal show={toonModal} onHide={() => setModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Bevestig abonnement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Weet u zeker dat u wilt overschakelen naar het{" "}
              <strong>{selectedAbonnement}</strong>-abonnement?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setModal(false)}>
              Annuleren
            </Button>
            <Button variant="success" onClick={handleAbonnementChange}>
              Bevestigen
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default WbAbboBeheer;
