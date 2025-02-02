import React, { useState, useEffect } from 'react';
import { Container, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import '../style/backoffice.css';
import BoNavbar from "../components/BoNavbar"

const BoWagenparkBehandeling = () => {
    // Usestates initializeren
    const [verzoeken, setVerzoeken] = useState([]);
    const [toonModal, setModal] = useState(false);
    const [selectedVerzoek, setSelectedVerzoek] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reden, setReden] = useState(""); // State voor de reden van afwijzing

    // Functie om wagenpark verzoeken op te halen
    const fetchVerzoeken = async () => {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }
        try {
            setLoading(true);
            const response = await axios.get(
                'https://localhost:7281/api/BackOfficeMedewerker/GetAllNieuwWagenParkVerzoeken',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setVerzoeken(response.data);
            setError(null);
        } catch (err) {
            setError('Er is een fout opgetreden bij het ophalen van de wagenparkverzoeken. Mogelijk zijn er nog geen verzoeken ingediend, of u heeft ze al allemaal behandeld. 👍👍👍');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Verzoeken ophalen
    useEffect(() => {
        fetchVerzoeken();
    }, []);

    // Methode om verzoeken goed te keuren
    const postGoedkeuren = async (id) => {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }
        try {
            await axios.put(
                'https://localhost:7281/api/BackOfficeMedewerker/AcceptVerzoek',
                { id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(`Verzoek met ID ${id} succesvol goedgekeurd.`);
            fetchVerzoeken();
        } catch (err) {
            console.error(`Er is een fout opgetreden bij het goedkeuren van verzoek met ID ${id}.`, err);
        }
    };

    // Methode om verzoeken af te wijzen
    const postAfwijzen = async (id, reden) => {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }
        try {
            await axios.put(
                'https://localhost:7281/api/BackOfficeMedewerker/WeigerVerzoek',
                { id, reden },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(`Verzoek met ID ${id} succesvol afgewezen.`);
            fetchVerzoeken();
        } catch (err) {
            console.error(`Er is een fout opgetreden bij het afwijzen van verzoek met ID ${id}.`, err);
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
        setReden(""); // Reset reden bij het sluiten van de modal
    };

    // Geef de verzoekid en reden mee als het verzoek wordt goedgekeurd of afgewezen.
    const handleConfirmAction = () => {
        if (selectedVerzoek) {
            const { verzoek, action } = selectedVerzoek;
            if (action === 'goedgekeuren') {
                postGoedkeuren(verzoek.wagenparkVerzoekId);
            } else if (action === 'afwijzen') {
                if (!reden) {
                    alert('Vul een reden in om het verzoek af te wijzen.');
                    return;
                }
                postAfwijzen(verzoek.wagenparkVerzoekId, reden); // Voeg de reden toe
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
            <h1 className="text-center pagina-titel mt-5 mb-3">Openstaande wagenpark verzoeken</h1>
            <Container fluid className="d-flex justify-content-center align-items-center">
                <Col md={8}>
                    <Card className="huren-box p-3 mt-5">
                        <Card.Body>
                            {loading ? (
                                <p className="text-center">Wagenpark verzoeken worden geladen...</p>
                            ) : error ? (
                                <p className="text-center">{error}</p>
                            ) : (
                                <div className="tabel-container">
                                    {onbehandeldeVerzoeken.length > 0 ? (
                                        onbehandeldeVerzoeken.map((verzoek) => (
                                            <Card key={verzoek.wagenparkVerzoekId} className="mb-3">
                                                <Card.Body>
                                                    <Card.Title><strong>Naam:</strong> {verzoek.voornaam} {verzoek.achternaam}</Card.Title>
                                                    <Card.Text><strong>Bedrijfsnaam:</strong> {verzoek.bedrijfsnaam}</Card.Text>
                                                    <Card.Text><strong>Email:</strong> {verzoek.email}</Card.Text>
                                                    <Card.Text><strong>KvK Nummer:</strong> {verzoek.kvkNummer}</Card.Text>

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
                                        <p className="text-center">Er zijn geen openstaande verzoeken.</p>
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
                    Weet je zeker dat je dit verzoek wilt {selectedVerzoek ? selectedVerzoek.action : ''}?
                    {selectedVerzoek?.action === 'afwijzen' && (
                        <div className="mt-3">
                            <label htmlFor="reden">Reden voor afwijzing:</label>
                            <textarea
                                id="reden"
                                rows="3"
                                className="form-control"
                                value={reden}
                                onChange={(e) => setReden(e.target.value)}
                                placeholder="Geef een reden voor de afwijzing"
                            />
                        </div>
                    )}
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

export default BoWagenparkBehandeling;
