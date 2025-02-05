import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import WbNavbar from "../components/WbNavbar";

const WbAbboBeheer = () => {
  const [toonModal, setShowModal] = useState(false);
  const [selectedAbonnement, setSelectedAbonnement] = useState(null);
  const [currentAbonnement, setCurrentAbonnement] = useState(null);
  const [abonnementen, setAbonnementen] = useState([]);

  // Haal alle abonnementen op bij component-mount
  useEffect(() => {
    const fetchAbonnementen = async () => {
      try {
        const response = await axios.get("https://localhost:7281/api/Abonnementen/GetWagenparkBeheerderAbonnementen");
        if (response.status === 200) {
          const formattedAbonnementen = response.data.map((abbo) => ({
            id: abbo.abonnementId,
            type: abbo.naam,
            kosten: `�${abbo.prijs} per maand`,
            description: `Abonnement type ${abbo.naam} met een prijs van �${abbo.prijs}.`,
          }));
          setAbonnementen(formattedAbonnementen);

          // Zorg ervoor dat het huidige abonnement wordt opgehaald na het laden van de lijst
          getCurrentAbonnement(formattedAbonnementen);
        } else {
          console.error("Er is iets misgegaan bij het ophalen van de abonnementen.");
        }
      } catch (error) {
        console.error("Fout bij het ophalen van de abonnementen:", error);
      }
    };

    fetchAbonnementen();
  }, []);

  //deze methode vraagt de huidige abbonement van de gebruiker op
  const getCurrentAbonnement = async (loadedAbonnementen) => {
    const token = sessionStorage.getItem('jwtToken');
    if (!token) {
      console.error('JWT-token ontbreekt in sessionStorage.');
      return;
    }

    try {
      const response = await axios.get(
        "https://localhost:7281/api/Abonnementen/GetCurrentAbonnement",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        const currentAbboId = response.data.abonnementId; // Het huidige abonnement-ID dat wordt geretourneerd
        const selected = loadedAbonnementen.find((abbo) => abbo.id === currentAbboId);

        if (selected) {
          setCurrentAbonnement(selected.type); // Stel de abonnementsnaam in
        } else {
          console.warn("Geen overeenkomstig abonnement gevonden.");
          setCurrentAbonnement("Onbekend abonnement");
        }
      } else {
        console.error("Er is iets misgegaan bij het ophalen van het huidige abonnement.");
      }
    } catch (error) {
      console.error("Fout bij het ophalen van het huidige abonnement:", error);
    }
    };

    //deze methode verandert de abbonement van de huidige gebruiker
  const handleAbonnementChange = async () => {
    const token = sessionStorage.getItem('jwtToken');
    if (!token) {
      console.error('JWT-token ontbreekt in sessionStorage.');
      return;
    }
    try {
      const response = await axios.post("https://localhost:7281/api/Abonnementen/wijzig-abonnement-wagenpark", {
        Id: selectedAbonnement,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const selected = abonnementen.find((abbo) => abbo.id === selectedAbonnement);
        setCurrentAbonnement(selected.type);
        setShowModal(false);
      } else {
        console.error("Er is iets misgegaan bij het wijzigen van het abonnement.");
      }
    } catch (error) {
      console.error("Fout bij het versturen van de aanvraag:", error);
    }
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
          <h4>Huidig abonnement: {currentAbonnement || "Laden..."}</h4>
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

