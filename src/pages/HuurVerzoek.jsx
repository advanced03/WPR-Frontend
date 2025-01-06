import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const HuurVerzoek = () => {
    const storedWagen = JSON.parse(sessionStorage.getItem('selectedWagen'));
    const [formData, setFormData] = useState({
        voertuigId: storedWagen?.voertuigId || '',  // fallback in case sessionStorage is empty
        startDatum: '',
        eindDatum: '',
        aardReis: '',
        bestemming: '',
        verwachteKM: '',  // Voeg een lege string toe voor verwachteKM
    });

    const [wagen, setWagen] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedWagen = JSON.parse(sessionStorage.getItem('selectedWagen'));
        if (storedWagen) {
            setWagen(storedWagen);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "verwachteKM" && (!/^\d*$/.test(value) || value.length > 5)) {
            return;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleGoBack = () => {
        navigate(-1); // Gaat terug naar de vorige pagina
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('FormData die verstuurd wordt:', formData); // Hier kun je de payload inspecteren

        // Verwijder beginDatum uit formData
        const { beginDatum, ...filteredFormData } = formData;

        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }

        try {
            const response = await axios.post(
                'https://localhost:7281/api/verhuurVerzoek/VerhuurVerzoekRequest',
                filteredFormData, // Verstuur alleen de gefilterde data
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Formulier succesvol ingediend:', response.data);
            navigate('/Home');
        } catch (error) {
            console.error('Fout bij het indienen van het formulier:', error);
        }
    };

    if (!wagen) {
        return <div>Loading wagen info...</div>;
    }

    return (
        <div className="achtergrond2">
            <h1 className="pagina-titel text-center"><br />Uw Keuze:</h1>
            <Container fluid className="d-flex justify-content-center align-items-center huren-background">
                <Col md={6}>
                    <Card className='huren-box p-4 mt-5'>
                        <Card.Body className="p-3">
                            <Card.Text className="text-center gekozen-auto mb-5 p-2">
                                <strong>Gekozen Auto:</strong> {wagen.merk} {wagen.type}
                            </Card.Text>

                            <Card.Title className="mb-3 p-2"><strong>Uw persoonlijke informatie</strong></Card.Title>
                            <Form className="p-2" onSubmit={handleSubmit}>
                                <Form.Group controlId="formstartDatum" className="p-2">
                                    <Form.Label>startdatum</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="startDatum"
                                        value={formData.startDatum}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEinddatum" className="p-2">
                                    <Form.Label>einddatum</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="eindDatum"
                                        value={formData.eindDatum}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formAardVanRij" className="p-2">
                                    <Form.Label>🏖️ Aard van het reis</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="aardReis"
                                        value={formData.aardReis}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBestemming" className="p-2">
                                    <Form.Label>🌍 Verste bestemming</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="bestemming"
                                        value={formData.bestemming}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formKilometers" className="p-2">
                                    <Form.Label>📏 Verwachte kilometers</Form.Label>
                                    <Form.Control
                                        type="number"  // verander 'int' naar 'number'
                                        name="verwachteKM"
                                        value={formData.verwachteKM}
                                        onChange={handleChange}
                                        maxLength={5}
                                    />
                                </Form.Group>
                                <div className="d-flex justify-content-center p-2">
                                    <Button className='knop' type="submit">👍 Huurverzoek indienen</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Container>
            <div className="d-flex justify-content-center my-4">
                <Button className="knop" onClick={handleGoBack}>← Terug</Button>
            </div>
        </div>
    );
};

export default HuurVerzoek;



