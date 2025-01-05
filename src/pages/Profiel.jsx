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

    const fetchUserData = async () => {
        const token = sessionStorage.getItem('jwtToken');

        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }

        try {
            const response = await axios.get('https://localhost:7281/api/account/getUserData', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setGebruiker(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Er is een fout opgetreden bij het ophalen van de gebruikersgegevens:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = sessionStorage.getItem('jwtToken');

        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }

        try {
            const response = await axios.put(
                'https://localhost:7281/api/account/updateUserData',
                {
                    username: gebruiker.username,
                    email: gebruiker.email,
                    phoneNumber: gebruiker.phoneNumber
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log('Gebruiker succesvol bijgewerkt:', response.data);

            setEditModus(false);
            setGebruiker(response.data);

            // Herlaad de gebruikersgegevens
            fetchUserData();
        } catch (error) {
            console.error('Er is een fout opgetreden bij het opslaan van de gebruikersgegevens:', error);
        }
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
                                        <FormGroup controlId="email">
                                            <FormLabel>Email</FormLabel>
                                            <FormControl
                                                type="email"
                                                value={gebruiker.email}
                                                onChange={(e) => setGebruiker({ ...gebruiker, email: e.target.value })}
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="bedrijfsemailtag">
                                            <FormLabel>Bedrijfs email tag</FormLabel>
                                            <FormControl
                                                type="text"
                                                value={gebruiker.bedrijfsemailtag}
                                                onChange={(e) => setGebruiker({ ...gebruiker, bedrijfsemailtag: e.target.value })}
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="bedrijfsnaam">
                                            <FormLabel>Bedrijfsnaam</FormLabel>
                                            <FormControl
                                                type="text"
                                                value={gebruiker.bedrijfsnaam}
                                                onChange={(e) => setGebruiker({ ...gebruiker, bedrijfsnaam: e.target.value })}
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="telefoonnummer">
                                            <FormLabel>Telefoonnummer</FormLabel>
                                            <FormControl
                                                type="tel"
                                                value={gebruiker.phoneNumber}
                                                onChange={(e) => setGebruiker({ ...gebruiker, phoneNumber: e.target.value })}
                                            />
                                        </FormGroup>
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
                                onClick={() => {
                                    setEditModus(false);
                                    fetchUserData();  // Voeg dit toe om opnieuw de gegevens op te halen
                                }}
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


