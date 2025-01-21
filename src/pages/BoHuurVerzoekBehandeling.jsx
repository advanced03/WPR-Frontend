import React, { useState, useEffect } from 'react';
import { Container, Col, Card, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import '../style/backoffice.css';
import BoNavbar from "../components/BoNavbar"

const BoHuurVerzoekBehandeling = () => {
    // Usestates initializeren
    const [verzoeken, setVerzoeken] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedVerzoek, setSelectedVerzoek] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Functie om huurverzoeken op te halen
    const fetchVerzoeken = async () => {
        const token = sessionStorage.getItem('jwtToken');

        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get(
                'https://localhost:7281/api/verhuurVerzoek/GetAllPendingVerhuurVerzoeken',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setVerzoeken(response.data);
            setError(null);
        } catch (err) {
            setError('Er is een fout opgetreden bij het ophalen van de huurverzoeken.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVerzoeken();
    }, []);

    const postGoedkeuren = async () => {
        const token = sessionStorage.getItem('jwtToken');

        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }

        if (selectedVerzoek && selectedVerzoek.verzoek) {
            const verzoekId = selectedVerzoek.verzoek.verhuurverzoekId; // Haal de juiste ID uit selectedVerzoek

            try {
                console.log('Payload:', { verzoekId });
                await axios.post(
                    `https://localhost:7281/api/Reserveringen/KeurVerzoekGoed/${verzoekId}`,
                    { verzoekId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                console.log(`Verzoek met ID ${verzoekId} succesvol goedgekeurd.`);
                fetchVerzoeken(); // Haal de verzoeken opnieuw op
            } catch (err) {
                console.error(`Er is een fout opgetreden bij het goedkeuren van verzoek met ID ${verzoekId}.`, err);
            }
        }
    };


    const postAfwijzen = async () => {
        const token = sessionStorage.getItem('jwtToken');

        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }

        if (selectedVerzoek && selectedVerzoek.verzoek) {
            const verzoekId = selectedVerzoek.verzoek.verhuurverzoekId; // Haal de juiste ID uit selectedVerzoek

            try {
                await axios.post(
                    `https://localhost:7281/api/Reserveringen/KeurVerzoekAf/${verzoekId}`,
                    { verzoekId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                console.log(`Verzoek met ID ${verzoekId} succesvol afgewezen.`);
                fetchVerzoeken(); // Haal de verzoeken opnieuw op
            } catch (err) {
                console.error(`Er is een fout opgetreden bij het afwijzen van verzoek met ID ${verzoekId}.`, err);
            }
        }
    };


    const handleShowModal = (verzoek, action) => {
        setSelectedVerzoek({ verzoek, action });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedVerzoek(null);
    };

    const handleConfirmAction = () => {
        if (selectedVerzoek) {
            const { verzoek, action } = selectedVerzoek;
            if (action === 'goedgekeuren') {
                postGoedkeuren(verzoek.id);
            } else if (action === 'afwijzen') {
                postAfwijzen(verzoek.id);
            }
        }
        handleCloseModal();
    };

    const onbehandeldeVerzoeken = verzoeken.filter(
        (verzoek) => !verzoek.goedgekeurd && !verzoek.afgewezen
    );

    return (
        <div className="achtergrond2">
            <BoNavbar />
            <h1 className="text-center pagina-titel my-3">Openstaande huurverzoeken</h1>
            <Container fluid className="d-flex justify-content-center align-items-center">
                <Col md={8}>
                    <Card className="huren-box p-3 mt-5">
                        <Card.Body>
                            {loading ? (
                                <p className="text-center">Huurverzoeken worden geladen...</p>
                            ) : error ? (
                                <p className="text-center text-danger">{error}</p>
                            ) : (
                                <div className="tabel-container">
                                    {onbehandeldeVerzoeken.length > 0 ? (
                                        onbehandeldeVerzoeken.map((verzoek) => (
                                            <Card key={verzoek.id} className="mb-3">
                                                <Card.Body>
                                                    <Card.Title><strong>Naam:</strong> {verzoek.volledigeNaam}</Card.Title>
                                                    <Card.Text><strong>Voertuig:</strong> {`${verzoek.voertuigMerk} ${verzoek.voertuigType}`}</Card.Text>
                                                    <Card.Text><strong>Startdatum:</strong> {verzoek.startDatum}</Card.Text>
                                                    <Card.Text><strong>Einddatum:</strong> {verzoek.eindDatum}</Card.Text>
                                                    <Card.Text><strong>Aard van de reis:</strong> {verzoek.aardReis}</Card.Text>
                                                    <Card.Text><strong>Verste bestemming:</strong> {verzoek.bestemming}</Card.Text>
                                                    <Card.Text><strong>Verwachte kilometers:</strong> {verzoek.verwachtteKM}</Card.Text>

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
                                        <p className="text-center">Er zijn geen openstaande huurverzoeken.</p>
                                    )}
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Container>

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
