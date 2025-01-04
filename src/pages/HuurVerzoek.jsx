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

        // Validatie
        if (!formData.naam || !formData.adres || !formData.rijbewijsNummer || !formData.aardVanRij || !formData.versteBestemming || !formData.verwachteKilometers) {
            setError('Alle velden zijn verplicht!');
            return;
        }

        if (isNaN(formData.verwachteKilometers)) {
            setError('Verwachte kilometers moeten een nummer zijn.');
            return;
        }

        try {
            // Voorbeeld van een POST-aanroep naar een API
            const response = await axios.post('https://localhost:7281/api/verhuurVerzoek/VerhuurVerzoekRequest', formData);

            if (response.status === 200) {
                setSuccess(true);
                setError(null);
                setTimeout(() => {
                    navigate('/bevestiging'); // Redirect naar de bevestigingspagina
                }, 3000);
            }
        } catch (error) {
            setError('Er is een fout opgetreden bij het indienen van uw verzoek.');
            setSuccess(false);
        }
    };

    return (
        <>
            <div className="achtergrond2"></div>
            <h1 className="pagina-titel text-center"><br />Uw Keuze:</h1>
            <Container fluid className="d-flex justify-content-center align-items-center huren-background">
                <Col md={6}>
                    <Card className='huren-box p-2 mt-5'>
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
                                    <Form.Label>🏖️ Aard van de reis</Form.Label>
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

