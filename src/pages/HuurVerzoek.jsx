import React, { useState } from 'react';
import { Container, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const wagens = [
    { VoertuigId: 1, Merk: 'Ford', model: 'Fiesta', kleur: 'Blauw' }
];

const HuurVerzoek = () => {
    const [formData, setFormData] = useState({
        naam: '',
        adres: '',
        rijbewijsNummer: '',
        aardVanRij: '',
        versteBestemming: '',
        verwachteKilometers: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleHuurVerzoek = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            const response = await axios.post(`https://localhost:7281/api/verhuur/verzoek`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) { // 201 Created
                setSuccess(true);
                setFormData({
                    naam: '',
                    adres: '',
                    rijbewijsNummer: '',
                    aardVanRij: '',
                    versteBestemming: '',
                    verwachteKilometers: '',
                });

                // Navigate to a confirmation page after a delay
                setTimeout(() => navigate('/bevestiging'), 2000);
            }
        } catch (error) {
            console.error('Error during rental request:', error);
            if (error.response) {
                setError(error.response.data.message || 'Er is een fout opgetreden tijdens het indienen van uw verzoek.');
            } else if (error.request) {
                setError('Geen antwoord van de server. Probeer het later opnieuw.');
            } else {
                setError(error.message);
            }
        }
    };

    return (
        <>
            <div className="achtergrond2"></div>
            <h1 className="huren-titel text-center"><br />Uw Keuze:</h1>
            <Container fluid className="d-flex justify-content-center align-items-center huren-background">
                <Col md={6}>
                    <Card className='huren-box p-2'>
                        <Card.Body>
                            {wagens.map((wagen) => (
                                <Card.Text className="text-center mb-5" key={wagen.VoertuigId}>
                                    <strong>Gekozen Auto:</strong> {wagen.Merk} {wagen.model}
                                </Card.Text>
                            ))}

                            <Card.Title className="mb-3"><strong>Uw persoonlijke informatie</strong></Card.Title>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && (
                                <Alert variant="success">
                                    Verzoek succesvol ingediend! U wordt doorgestuurd naar de bevestigingspagina.
                                </Alert>
                            )}
                            <Form onSubmit={handleHuurVerzoek}>
                                <Form.Group controlId="formNaam">
                                    <Form.Label>👤 Uw wettelijke naam</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="naam"
                                        value={formData.naam}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formAdres">
                                    <Form.Label>📍 Adres</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="adres"
                                        value={formData.adres}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formRijbewijsNummer">
                                    <Form.Label>🪪 Rijbewijs documentnummer</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="rijbewijsNummer"
                                        value={formData.rijbewijsNummer}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formAardVanRij">
                                    <Form.Label>🏖️ Aard van het reis</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="aardVanRij"
                                        value={formData.aardVanRij}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formVersteBestemming">
                                    <Form.Label>🌍 Verste bestemming</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="versteBestemming"
                                        value={formData.versteBestemming}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formKilometers">
                                    <Form.Label>📏 Verwachte kilometers</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="verwachteKilometers"
                                        value={formData.verwachteKilometers}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <div className="d-flex justify-content-center">
                                    <Button className='knop' type="submit">👍 Huurverzoek indienen</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Container>
        </>
    );
};

export default HuurVerzoek;
