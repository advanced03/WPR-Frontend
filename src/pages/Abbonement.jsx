//Import statements
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Alert } from "react-bootstrap";
import PartNavbar from "../components/PartNavbar.jsx";
import axios from 'axios';

//Abbonement klasse
const Abbonement = () => {
    //States initialiseren.
    const [toonModal, setShowModal] = useState(false);
    const [selectedAbonnement, setSelectedAbonnement] = useState(null);
    const [currentAbonnement, setCurrentAbonnement] = useState(null);
    const [abonnementen, setAbonnementen] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        // Beschikbare abbonementen ophalen via de juiste endpoint, als er een error is zal deze in de console getoond worden.
        const fetchAbonnementen = async () => {
            try {
                const response = await axios.get("https://localhost:7281/api/Abonnementen/GetUserAbonnementen");
                if (response.status === 200) {
                    const formattedAbonnementen = response.data.map((abbo) => ({
                        id: abbo.abonnementId,
                        type: abbo.naam,
                        kosten: `€${abbo.prijs} per maand`,
                        description: `Abonnement type ${abbo.naam} met een prijs van €${abbo.prijs}.`,
                    }));
                    setAbonnementen(formattedAbonnementen);
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

    // Haal het huidige abbonement van de gebruiker op. Toon error als deze niet is gevoenden.
    const getCurrentAbonnement = async (loadedAbonnementen) => {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }

        try {
            const response = await axios.get("https://localhost:7281/api/Abonnementen/GetCurrentAbonnement", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                const currentAbboId = response.data.abonnementId;
                const selected = loadedAbonnementen.find((abbo) => abbo.id === currentAbboId);
                setCurrentAbonnement(selected ? selected.type : "Onbekend abonnement");
            } else {
                console.error("Er is iets misgegaan bij het ophalen van het huidige abonnement.");
            }
        } catch (error) {
            console.error("Fout bij het ophalen van het huidige abonnement:", error);
        }
    };

    // Methode om de abbonement te kunnen wijzigen, met behulp van de JWT token van de gebruiker.
    const handleAbonnementChange = async () => {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }
        try {
            const response = await axios.post("https://localhost:7281/api/Abonnementen/wijzig-abonnement-user", {
                Id: selectedAbonnement,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            //Verberg modal en toon alert als het succesvol is gewijzigd.
            if (response.status === 200) {
                const selected = abonnementen.find((abbo) => abbo.id === selectedAbonnement);
                setCurrentAbonnement(selected.type);
                setShowModal(false);
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);
            } else {
                console.error("Er is iets misgegaan bij het wijzigen van het abonnement.");
            }
        } catch (error) {
            console.error("Fout bij het versturen van de aanvraag:", error);
        }
    };

    // Code voor layout etc.
    return (
        <div className="achtergrond2">
            <PartNavbar />
            <Container className="py-4">
                <Row className="my-4">
                    <Col>
                        <h1 className="pagina-titel text-center mb-5">Abonnementenbeheer</h1>
                    </Col>
                </Row>
                {/* Alert */}
                {showAlert && (
                    <Alert variant="success" className="text-center">
                        Uw abonnement is succesvol gewijzigd! 🎉
                    </Alert>
                )}
                <Row>
                    {abonnementen.map((abbo, index) => (
                        <Col md={6} key={index} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{abbo.type}</Card.Title>
                                    <Card.Text><strong>Prijs:</strong> {abbo.kosten}</Card.Text>
                                    <Button
                                        className="knop"
                                        onClick={() => {
                                            setSelectedAbonnement(abbo.id);
                                            setShowModal(true);
                                        }}
                                    >
                                        Kies dit abonnement 💸
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <div className="text-center my-5 p-4 huren-box">
                    <h4>Huidig abonnement: {currentAbonnement || "Laden..."}</h4>
                </div>
                <Modal show={toonModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Bevestig keuze</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                        Bent u zeker dat u wilt overstappen naar dit abonnement? Houd er rekening mee dat u uw abonnement niet kunt wijzigen zolang uw huidige abonnement nog actief is.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleAbonnementChange}>
                            Bevestigen
                        </Button>
                        <Button variant="danger" onClick={() => setShowModal(false)}>
                            Annuleren
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>

            <Container className="home-inhoud text-center p-5 my-3">
                <Row>
                    <Col xs={12} md={6}>
                        <h3>Waarom kiezen voor een abonnement bij Car And All? 🤔</h3>
                        <p>
                            Bij Car And All bieden we flexibele abonnementsopties die perfect aansluiten op jouw behoeften. Kies voor een abonnement en geniet van het gemak van een vast bedrag per maand, zodat je je geen zorgen hoeft te maken over onverwachte kosten.
                            We bieden momenteel vier opties aan, dus er is altijd een keuze die bij je past!
                        </p>
                    </Col>

                    <Col xs={12} md={6}>
                        <h4>Waarom een abonnement handiger is:</h4>
                        <ul className="list-unstyled">
                            <li>✔ Vaste maandprijs zonder verrassingen</li>
                            <li>✔ Flexibele keuze tussen verschillende pakketten</li>
                            <li>✔ Altijd toegang tot het nieuwste wagenpark van CarAndAll</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Abbonement;
