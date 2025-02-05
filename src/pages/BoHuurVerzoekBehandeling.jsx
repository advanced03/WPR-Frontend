import React, { useState, useEffect } from 'react';
import { Container, Col, Card, Button, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';
import '../style/backoffice.css';
import BoNavbar from "../components/BoNavbar";

const BoHuurVerzoekBehandeling = () => {
    // Usestates initializeren
    const [verzoeken, setVerzoeken] = useState([]);
    const [toonModal, setModal] = useState(false);
    const [selectedVerzoek, setSelectedVerzoek] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Functie om datums op de juiste wijze te tonen
    const formatDatum = (datum) => {
        const date = new Date(datum);
        return date.toLocaleDateString('nl-NL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Functie om huurverzoeken op te halen
    const fetchVerzoeken = async () => {
        const token = sessionStorage.getItem('jwtToken');
        // Check of JWT token aanwezig is
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
            setError('Er zijn geen huurverzoeken gevonden ❌ Wellicht heeft u alle verzoeken al behandeld? 🤔');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Verzoeken ophalen
    useEffect(() => {
        fetchVerzoeken();
    }, []);

    // Methode om huurverzoeken goed te keuren
    const postGoedkeuren = async () => {
        const token = sessionStorage.getItem('jwtToken');

        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }
        // Haal de juiste ID uit selectedVerzoek
        if (selectedVerzoek && selectedVerzoek.verzoek) {
            const verzoekId = selectedVerzoek.verzoek.verhuurverzoekId;

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

    // Methode om huurverzoeken goed te keuren
    const postAfwijzen = async () => {
        const token = sessionStorage.getItem('jwtToken');
        // Geef een error als het JWT token mist.
        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }
        // Haal de juiste ID uit selectedVerzoek
        if (selectedVerzoek && selectedVerzoek.verzoek) {
            const verzoekId = selectedVerzoek.verzoek.verhuurverzoekId;

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
                // Haal de verzoeken opnieuw op
                fetchVerzoeken();
            } catch (err) {
                console.error(`Er is een fout opgetreden bij het afwijzen van verzoek met ID ${verzoekId}.`, err);
            }
        }
    };

    // Toon of verberg de modal
    const handletoonModal = (verzoek, action) => {
        setSelectedVerzoek({ verzoek, action });
        setModal(true);
    };

    const handleCloseModal = () => {
        setModal(false);
        setSelectedVerzoek(null);
    };

    // Geef de verzoekid mee als er een verzoek wordt goedgekeurd of afgewezen.
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

    // Verzoeken filteren zodat we alleen de juiste verzoeken te zien krijgen.
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
                                <Alert variant="danger" className="text-center">{error}</Alert>
                            ) : (
                                <div className="tabel-container">
                                    {onbehandeldeVerzoeken.length > 0 ? (
                                        onbehandeldeVerzoeken.map((verzoek) => (
                                            <Card key={verzoek.verhuurverzoekId} className="mb-3">
                                                <Card.Body>
                                                    <Card.Title><strong>Naam:</strong> {verzoek.volledigeNaam}</Card.Title>
                                                    <Card.Text><strong>Voertuig:</strong> {`${verzoek.voertuigMerk} ${verzoek.voertuigType}`}</Card.Text>
                                                    <Card.Text><strong>Voertuig Soort:</strong> {verzoek.voertuigSoort}</Card.Text>
                                                    <Card.Text><strong>Aard van de reis:</strong> {verzoek.aardReis}</Card.Text>
                                                    <Card.Text><strong>Bestemming:</strong> {verzoek.bestemming}</Card.Text>
                                                    <Card.Text><strong>Verwachte kilometers:</strong> {verzoek.verwachtteKM}</Card.Text>
                                                    <Card.Text><strong>Startdatum:</strong> {formatDatum(verzoek.startDatum)}</Card.Text>
                                                    <Card.Text><strong>Einddatum:</strong> {formatDatum(verzoek.eindDatum)}</Card.Text>
                                                    <Card.Text><strong>Accessoires:</strong> {verzoek.accessoires.join(", ") || 'Geen'}</Card.Text>
                                                    <Card.Text><strong>Verzekering:</strong> {verzoek.verzekering}</Card.Text>

                                                    <div className="d-flex justify-content-start">
                                                        <Button
                                                            className="mx-1"
                                                            variant="success"
                                                            onClick={() => handletoonModal(verzoek, 'goedgekeuren')}
                                                        >
                                                            Goedkeuren
                                                        </Button>
                                                        <Button
                                                            className="mx-1"
                                                            variant="danger"
                                                            onClick={() => handletoonModal(verzoek, 'afwijzen')}
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
            {/* Modal layout */}
            <Modal show={toonModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Bevestiging</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Weet je zeker dat u dit verzoek wilt {selectedVerzoek ? selectedVerzoek.action : ''}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleConfirmAction}>
                        Bevestigen
                    </Button>
                    <Button variant="danger" onClick={handleCloseModal}>
                        Annuleren
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BoHuurVerzoekBehandeling;
