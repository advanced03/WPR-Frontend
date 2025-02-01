import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import BoNavbar from '../components/BoNavbar';
import FoNavbar from '../components/FoNavbar';
import PartNavbar from "../components/PartNavbar.jsx";
import WbNavbar from '../components/WbNavbar';

const HuurVerzoek = () => {
    const [role, setRole] = useState('');
    const storedWagen = JSON.parse(sessionStorage.getItem('selectedWagen'));
    const [formData, setFormData] = useState({
        voertuigId: storedWagen?.voertuigId || '',
        startDatum: '',
        eindDatum: '',
        aardReis: '',
        bestemming: '',
        verwachtteKM: '',
    });

    const [wagen, setWagen] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedWagen = JSON.parse(sessionStorage.getItem('selectedWagen'));
        if (storedWagen) {
            setWagen(storedWagen);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "verwachtteKM" && (!/^\d*$/.test(value) || value.length > 5)) {
            return;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('FormData die verstuurd wordt:', formData);

        const { beginDatum, ...filteredFormData } = formData;

        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }

        try {
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
            setShowAlert(true);

            // Herleiding na 3 seconden
            setTimeout(() => {
                navigate('/Home');
            }, 3000);

        } catch (error) {
            console.error('Fout bij het indienen van het formulier:', error);
        }
    };

    if (!wagen) {
        return <div>Loading wagen info...</div>;
    }

    const renderNavbar = () => {
        switch (role) {
            case 'backendWorker':
                return <BoNavbar />;
            case 'wagenparkBeheerder':
                return <WbNavbar />;
            case 'particuliereKlant':
            case 'bedrijfsKlant':
                return <PartNavbar />;
            case 'frontendWorker':
                return <FoNavbar />;
            default:
                return <PartNavbar />;
        }
    };

    return (
        <div className="achtergrond2">
            {renderNavbar()}
            <h1 className="pagina-titel text-center"><br />Uw Keuze:</h1>
            <Container fluid className="d-flex justify-content-center align-items-center huren-background">
                <Col md={6}>
                {showAlert && (
                    <Alert variant="success" className="text-center mt-3">
                        Uw huurverzoek is succesvol ingediend! U zult over 3 seconden herleid worden.
                    </Alert>
                )}
                    <Card className='huren-box p-4 mt-5'>
                        <Card.Img
                            variant="top"
                            src={`src/logos/${wagen.merk.toLowerCase()}.png`}
                            className="car-image" />
                        <Card.Body className="p-3">
                            <Card.Text className="text-center gekozen-auto mb-5 p-2">
                                <strong>Gekozen Auto:</strong> {wagen.merk} {wagen.type}
                            </Card.Text>

                            <Card.Title className="mb-3 p-2"><strong>Uw persoonlijke informatie</strong></Card.Title>
                            <Form className="p-2" onSubmit={handleSubmit}>
                                <Form.Group controlId="formstartDatum" className="p-2">
                                    <Form.Label>Uw startdatum:</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="startDatum"
                                        value={formData.startDatum}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEinddatum" className="p-2">
                                    <Form.Label>Uw einddatum</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="eindDatum"
                                        value={formData.eindDatum}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formAardVanRij" className="p-2">
                                    <Form.Label>🏖️ De aard van het reis</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="aardReis"
                                        value={formData.aardReis}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBestemming" className="p-2">
                                    <Form.Label>🌍 Uw verste bestemming</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="bestemming"
                                        value={formData.bestemming}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formKilometers" className="p-2">
                                    <Form.Label>📏 Verwachting aantal afgelegde KM</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="verwachtteKM"
                                        value={formData.verwachtteKM}
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
