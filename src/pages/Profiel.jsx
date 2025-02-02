import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BoNavbar from '../components/BoNavbar';
import FoNavbar from '../components/FoNavbar';
import PartNavbar from "../components/PartNavbar.jsx";
import WbNavbar from '../components/WbNavbar';

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
    const [passwordModus, setPasswordModus] = useState(false); // Nieuw: voor wachtwoord wijziging
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState('');

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const fetchUserData = async () => {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) return;

        try {
            const response = await axios.get('https://localhost:7281/api/account/getUserData', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setGebruiker(response.data);
            setRole(response.data.role);
            setLoading(false);
        } catch (error) {
            console.error('Fout bij ophalen gegevens:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('jwtToken');
        if (!token) return;

        try {
            const response = await axios.put('https://localhost:7281/api/account/updateUserData', {
                username: gebruiker.username,
                email: gebruiker.email,
                phoneNumber: gebruiker.phoneNumber
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setGebruiker(response.data);
            setEditModus(false);
            fetchUserData();
        } catch (error) {
            console.error('Fout bij opslaan gegevens:', error);
        }
    };

    // Functie om het wachtwoord te wijzigen
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Nieuwe wachtwoorden komen niet overeen.");
            return;
        }

        const token = sessionStorage.getItem('jwtToken');
        if (!token) return;

        try {
            await axios.put('https://localhost:7281/api/account/changePassword', {
                oldPassword: oldPassword,
                newPassword: newPassword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setPasswordModus(false); // Sluit de wachtwoordwijzigingsmodus af
            alert("Wachtwoord gewijzigd!");
        } catch (error) {
            console.error('Fout bij het wijzigen van het wachtwoord:', error);
        }
    };

    if (loading) {
        return <div>Laden...</div>;
    }

    // Juiste navigatie balk laten zien op basis van de gebruikersrol 
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
            <h1 className="pagina-titel text-center mt-5">Mijn profiel</h1>
            <Container className="py-5">
                {editModus ? (
                    <Form onSubmit={handleSubmit}>
                        <Row className="justify-content-center">
                            <Col md={8}>
                                <Card className="border-0 shadow rounded-lg mt-5">
                                    <Card.Header className="bg-custom text-white border-bottom">
                                        <h3 className="mb-0">Profiel Bewerken</h3>
                                    </Card.Header>
                                    <Card.Body>
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
                                        {gebruiker.bedrijfsnaam && (
                                            <FormGroup controlId="bedrijfsnaam">
                                                <FormLabel>Bedrijfsnaam</FormLabel>
                                                <FormControl
                                                    type="text"
                                                    value={gebruiker.bedrijfsnaam}
                                                    onChange={(e) => setGebruiker({ ...gebruiker, bedrijfsnaam: e.target.value })}
                                                />
                                            </FormGroup>
                                        )}
                                        <Form.Group controlId="formtelefoonnummer" className="mb-3">
                                            <Form.Label>📱 Telefoonnummer</Form.Label>
                                            <Form.Control
                                                type="tel"
                                                placeholder="Voer uw telefoonnummer in"
                                                value={gebruiker.phoneNumber}
                                                onChange={(e) => {
                                                    const digitsOnly = e.target.value.replace(/\D/g, '');
                                                    if (digitsOnly.length <= 13) {
                                                        setGebruiker({ ...gebruiker, phoneNumber: digitsOnly });
                                                    }
                                                }}
                                                required
                                                isInvalid={gebruiker.phoneNumber && !/^\d{10,13}$/.test(gebruiker.phoneNumber)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Voer een geldig telefoonnummer in.
                                            </Form.Control.Feedback>
                                        </Form.Group>
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
                                    fetchUserData();
                                }}
                            >
                                Annuleren
                            </Button>
                        </div>
                    </Form>
                ) : passwordModus ? (
                    <Form onSubmit={handlePasswordChange}>
                        <Row className="justify-content-center">
                            <Col md={8}>
                                <Card className="border-0 shadow rounded-lg mt-5">
                                    <Card.Header className="bg-custom text-white border-bottom">
                                        <h3 className="mb-0">Wijzig Wachtwoord</h3>
                                    </Card.Header>
                                    <Card.Body>
                                        <FormGroup controlId="oldPassword">
                                            <FormLabel>Oud Wachtwoord</FormLabel>
                                            <FormControl
                                                type="password"
                                                value={oldPassword}
                                                onChange={(e) => setOldPassword(e.target.value)}
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="newPassword">
                                            <FormLabel>Nieuw Wachtwoord</FormLabel>
                                            <FormControl
                                                type="password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                minLength={12}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Uw nieuwe wachtwoord moet minimaal 12 tekens lang zijn.
                                            </Form.Control.Feedback>
                                        </FormGroup>
                                        <FormGroup controlId="confirmPassword">
                                            <FormLabel>Bevestig Nieuw Wachtwoord</FormLabel>
                                            <FormControl
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                isInvalid={newPassword !== confirmPassword}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Wachtwoorden komen niet overeen.
                                            </Form.Control.Feedback>
                                        </FormGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-center mt-5">
                            <Button variant="success" size="lg" className="mx-2" type="submit">
                                Wijzig Wachtwoord
                            </Button>
                            <Button
                                variant="danger"
                                size="lg"
                                className="mx-2"
                                onClick={() => setPasswordModus(false)}
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
                                        <h3 className="mb-0">Welkom, {gebruiker.username}</h3>
                                    </Card.Header>
                                    <Card.Body>
                                        <p className="mb-0">Email: {gebruiker.email}</p>
                                        {gebruiker.bedrijfsnaam && <p className="mb-0">Bedrijfsnaam: {gebruiker.bedrijfsnaam}</p>}
                                        {gebruiker.bedrijfsemailtag && <p className="mb-0">Bedrijfs email tag: {gebruiker.bedrijfsemailtag}</p>}
                                        <p className="mb-0">Telefoonnummer: {gebruiker.phoneNumber || 'N.v.t.'}</p>
                                        <p className="mb-0">Voornaam: {gebruiker.voornaam || 'N.v.t.'}</p>
                                        <p className="mb-0">Achternaam: {gebruiker.achternaam || 'N.v.t.'}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-center mt-5">
                            <Button className="knop mx-3" size="lg" onClick={() => setEditModus(true)}>
                                Wijzig profielgegevens
                            </Button>
                            <Button className="knop mx-3" size="lg" onClick={() => setPasswordModus(true)}>
                                Wijzig wachtwoord
                            </Button>
                        </div>
                    </>
                )}
            </Container>
        </div>
    );
}

export default Profiel;
