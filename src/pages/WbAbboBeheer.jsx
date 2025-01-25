import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import WbNavbar from "../components/WbNavbar";

const WbAbboBeheer = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedAbonnement, setSelectedAbonnement] = useState(null);
    const [currentAbonnement, setCurrentAbonnement] = useState("Pay as You Go");
    const [abonnementen, setAbonnementen] = useState([]);

    useEffect(() => {
        const fetchAbonnementen = async () => {
            try {
                const response = await axios.get("https://localhost:7281/api/Abonnement/GetAllAbonnementen");
                if (response.status === 200) {
                    const formattedAbonnementen = response.data.map((abbo) => ({
                        id: abbo.abonnementId,
                        type: abbo.abonnementType,
                        kosten: `€${abbo.abonnementPrijs} per maand`,
                        description: `Abonnement type ${abbo.abonnementType} met een prijs van €${abbo.abonnementPrijs}.`,
                    }));
                    setAbonnementen(formattedAbonnementen);
                } else {
                    console.error("Er is iets misgegaan bij het ophalen van de abonnementen.");
                }
            } catch (error) {
                console.error("Fout bij het ophalen van de abonnementen:", error);
            }
        };

        fetchAbonnementen();
    }, []);

    const handleAbonnementChange = async () => {
        try {
            const response = await axios.put("https://localhost:7281/api/Abonnement/ChangeAbonnement", {
                abonnementId: selectedAbonnement,
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
                    {abonnementen.map((abbo) => (
                        <Col md={6} key={abbo.id} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{abbo.type}</Card.Title>
                                    <Card.Text>{abbo.description}</Card.Text>
                                    <Card.Text><strong>Kosten:</strong> {abbo.kosten}</Card.Text>
                                    <Button
                                        className="knop"
                                        onClick={() => {
                                            setSelectedAbonnement(abbo.id);
                                            setShowModal(true);
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

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Bevestig abonnement</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Weet u zeker dat u wilt overschakelen naar het abonnement met ID: <strong>{selectedAbonnement}</strong>?
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => setShowModal(false)}>
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
