import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import PartNavbar from "../components/PartNavbar.jsx";

function Profiel() {
    const [gebruiker, setGebruiker] = useState({
        username: '',
        email: '',
        bedrijfsemailtag: '',
        bedrijfsnaam: '',
        voornaam: '',
        achternaam: '',
        phoneNumber: '',
        wachtwoord: ''
    });

    const [editModus, setEditModus] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            // Haal de token op uit sessionStorage
            const token = sessionStorage.getItem('jwtToken');

            if (!token) {
                console.error('JWT-token ontbreekt in sessionStorage.');
                return;
            }

            try {
                // Haal gebruikersgegevens op van de backend
                const response = await axios.get('https://localhost:7281/api/account/getUserData', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Zet de ontvangen gegevens in de state
                setGebruiker(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Er is een fout opgetreden bij het ophalen van de gebruikersgegevens:', error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Wijzigingen opgeslagen:', gebruiker);
        setEditModus(false);
    };

    if (loading) {
        return <div>Laden...</div>;
    }

    return (
        <div className="achtergrond2">
            <PartNavbar />
            <h1 className="pagina-titel text-center mt-5">Mijn profiel</h1>
            <Container className="py-5 scroll-container">
                {editModus ? (
                    <Form onSubmit={handleSubmit}>
                        <Row className="justify-content-center">
                            <Col md={8}>
                                <Card className="border-0 shadow rounded-lg mt-5">
                                    <Card.Header className="bg-custom text-white border-bottom">
                                        <h3 className="mb-0">Profiel Bewerken</h3>
                                    </Card.Header>
                                    <Card.Body>
                                        {/* Form Fields */}
                                        <FormGroup controlId="gebruikersnaam">
                                            <FormLabel>Gebruikersnaam</FormLabel>
                                            <FormControl
                                                type="text"
                                                value={gebruiker.username}
                                                onChange={(e) => setGebruiker({ ...gebruiker, username: e.target.value })}
                                            />
                                        </FormGroup>
                                        {/* Herhaal FormGroup voor andere velden */}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-center mt-5">
                            <Button variant="success" size="lg" className="mx-2" type="submit">
                                Opslaan
                            </Button>
                            <Button
                                variant="danger"
                                size="lg"
                                className="mx-2"
                                onClick={() => setEditModus(false)}
                            >
                                Annuleren
                            </Button>
                        </div>
                    </Form>
                ) : (
                    <>
                        <Row className="justify-content-center">
                            <Col md={8}>
                                <Card className="border-0 shadow rounded-lg mt-5">
                                    <Card.Header className="bg-custom text-white border-bottom">
                                        <h3 className="mb-0">{gebruiker.username}</h3>
                                    </Card.Header>
                                    <Card.Body>
                                        <p className="mb-0">Email: {gebruiker.email}</p>
                                        {gebruiker.bedrijfsnaam && <p className="mb-0">Bedrijfsnaam: {gebruiker.bedrijfsnaam}</p>}
                                        {gebruiker.bedrijfsemailtag && <p className="mb-0">Bedrijfs email tag: {gebruiker.bedrijfsemailtag}</p>}
                                        <p className="mb-0">Telefoonnummer: {gebruiker.phoneNumber || 'N.v.t.'}</p>
                                        <p className="mb-0">Voornaam: {gebruiker.voornaam || 'N.v.t.'}</p>
                                        <p className="mb-0">Achternaam: {gebruiker.achternaam || 'N.v.t.'}</p>
                                        <p className="mb-0">Wachtwoord: {gebruiker.wachtwoord || 'N.v.t.'}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-center mt-5">
                            <Button className="knop" size="lg" onClick={() => setEditModus(true)}>
                                Wijzig
                            </Button>
                        </div>
                    </>
                )}
            </Container>
        </div>
    );    
}

export default Profiel;

