import React, { useState, useEffect } from 'react';
import { Container, Col, Card, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import '../style/backoffice.css';
import BoNavbar from "../components/BoNavbar";

const BoWagenparkBehandeling = () => {
    const [toonModal, setModal] = useState(false);
    const [selectedVerzoek, setSelectedVerzoek] = useState(null);
    const [verzoeken, setVerzoeken] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = sessionStorage.getItem('jwtToken');  // Haal de token uit sessionStorage

    // Fetch all requests
    useEffect(() => {
        const fetchVerzoeken = async () => {
            try {
                const response = await axios.get('/api/BackOfficeMedewerker/GetAllNieuwWagenParkVerzoeken', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setVerzoeken(response.data);
                setLoading(false);
            } catch (err) {
                setError("Fout bij het ophalen van verzoeken.");
                setLoading(false);
            }
        };
        fetchVerzoeken();
    }, [token]);

    const handletoonModal = (verzoek, action) => {
        setSelectedVerzoek({ verzoek, action });
        setModal(true);
    };

    const handleCloseModal = () => {
        setModal(false);
        setSelectedVerzoek(null);
    };

    const handleConfirmAction = async () => {
        try {
            await axios.put('/api/BackOfficeMedewerker/AcceptVerzoek', {
                id: selectedVerzoek.verzoek.wagenparkVerzoekId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Bij succesvolle actie, verzoeken opnieuw ophalen
            const updatedVerzoeken = verzoeken.filter(
                (verzoek) => verzoek.wagenparkVerzoekId !== selectedVerzoek.verzoek.wagenparkVerzoekId
            );
            setVerzoeken(updatedVerzoeken);
            handleCloseModal();
        } catch (err) {
            setError("Fout bij het verwerken van het verzoek.");
        }
    };

    const onbehandeldeVerzoeken = verzoeken.filter(
        (verzoek) => !verzoek.goedgekeurd && !verzoek.afgewezen
    );

    return (
        <div className="achtergrond2">
            <BoNavbar />
            <h1 className="text-center pagina-titel my-3">Openstaande Wagenpark Verzoeken</h1>
            <Container fluid className="d-flex justify-content-center align-items-center">
                <Col md={8}>
                    <Card className="huren-box p-3 mt-5">
                        <Card.Body>
                            {loading ? (
                                <p className="text-center">Verzoeken worden geladen...</p>
                            ) : error ? (
                                <p className="text-center text-danger">{error}</p>
                            ) : (
                                <div className="tabel-container">
                                    {onbehandeldeVerzoeken.length > 0 ? (
                                        onbehandeldeVerzoeken.map((verzoek) => (
                                            <Card key={verzoek.wagenparkVerzoekId} className="mb-3">
                                                <Card.Body>
                                                    <Card.Title><strong>Naam:</strong> {verzoek.voornaam} {verzoek.achternaam}</Card.Title>
                                                    <Card.Text><strong>Bedrijf:</strong> {verzoek.bedrijfsnaam}</Card.Text>
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

export default BoWagenparkBehandeling;
