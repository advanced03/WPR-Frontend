import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import WbNavbar from "../components/WbNavbar";

const WbAbboBeheer = () => {
  const [toonModal, setModal] = useState(false);
  const [selectedAbonnement, setSelectedAbonnement] = useState("");
  const [currentAbonnement, setCurrentAbonnement] = useState("Pay as You Go");
  const [abonnementen, setAbonnementen] = useState([]);

  useEffect(() => {
    // Fetch de abonnementen van de backend
    const fetchAbonnementen = async () => {
      try {
        const response = await fetch("/api/abonnementen");
        const data = await response.json();
        setAbonnementen(data);
      } catch (error) {
        console.error("Fout bij het ophalen van abonnementen:", error);
      }
    };

    fetchAbonnementen();
  }, []);

  const handleAbonnementChange = () => {
    setCurrentAbonnement(selectedAbonnement);
    setModal(false);
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
                  <Card.Text><strong>Dagelijkse KM limiet:</strong> {abbo.dagelijkseKmLimiet}</Card.Text>
                  <Card.Text><strong>Tarief (per kilometer):</strong> {abbo.tariefPerKm}</Card.Text>
                  <Card.Text><strong>Starttarief:</strong> {abbo.starttarief}</Card.Text>
                  <Card.Text><strong>Korting:</strong> {abbo.korting}</Card.Text>
                  <Card.Text><strong>Extra voordelen:</strong> {abbo.extraVoordelen}</Card.Text>
                  <Card.Text><strong>Suggestie prijs per maand:</strong> {abbo.suggestiePrijsPerMaand}</Card.Text>
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

        <Modal show={toonModal} onHide={() => setModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Bevestig abonnement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Weet u zeker dat u wilt overschakelen naar het <strong>{selectedAbonnement}</strong>-abonnement?
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
