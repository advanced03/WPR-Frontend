import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import PartNavbar from "../components/PartNavbar.jsx";

const HuurVerzoek = () => {
    // Haal de geselecteerde wagen op uit sessionStorage
    const storedWagen = JSON.parse(sessionStorage.getItem('selectedWagen'));
    const [formData, setFormData] = useState({
        voertuigId: storedWagen?.voertuigId || '', // fallback indien geen wagen geselecteerd
        startDatum: '',
        eindDatum: '',
        aardReis: '',
        bestemming: '',
        verwachteKM: '',  // leeg voor verwachte kilometers
    });

    const [wagen, setWagen] = useState(null);
    const navigate = useNavigate();

    // Laad wagen info uit sessionStorage bij component mount
    useEffect(() => {
        const storedWagen = JSON.parse(sessionStorage.getItem('selectedWagen'));
        if (storedWagen) {
            setWagen(storedWagen);
        }
    }, []);

    // Verwerk veranderingen in formulier input
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Beperk de verwachte kilometers tot cijfers en max 5 karakters
        if (name === "verwachteKM" && (!/^\d*$/.test(value) || value.length > 5)) {
            return;
        }
        setFormData({ ...formData, [name]: value });
    };

    // Ga terug naar de vorige pagina
    const handleGoBack = () => {
        navigate(-1);
    };

    // Verzend formulier data naar API
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('FormData die verstuurd wordt:', formData); // Inspecteer de data

        // Verwijder onnodige velden (zoals beginDatum)
        const { beginDatum, ...filteredFormData } = formData;

        // Haal JWT-token op uit sessionStorage
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }

        try {
            // Verstuur het formulier naar de API
            const response = await axios.post(
                'https://localhost:7281/api/verhuurVerzoek/VerhuurVerzoekRequest',
                filteredFormData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Formulier succesvol ingediend:', response.data);
            navigate('/Home');
        } catch (error) {
            console.error('Fout bij het indienen van het formulier:', error);
        }
    };

    if (!wagen) {
        return <div>Loading wagen info...</div>; // Toon loading boodschap totdat wagen info geladen is
    }

    return (
        <div className="achtergrond2">
            <PartNavbar />
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
                                        type="number"
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
