import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../style/register.css';
import axios from 'axios';
import WbNavbar from "../components/WbNavbar.jsx";

const WbReg = () => {
    // Usestates initializeren
    const [gewensdeUsername, setgewensdeUsername] = useState('');
    const [voornaam, setVoornaam] = useState('');
    const [achternaam, setAchternaam] = useState('');
    const [email, setEmail] = useState('');
    const [bedrijfsnaam, setbedrijfsnaam] = useState('');
    const [kvkNummer, setkvkNummer] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    // Verwerking van register formulier
    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            // Payload voor het inloggen
            console.log('Payload:', {
                voornaam,
                achternaam,
                gewensdeUsername,
                email,
                bedrijfsnaam,
                kvkNummer,
            });

            const response = await axios.put(
                `https://localhost:7281/api/Account/NieuwWagenParkVerzoek`,
                {
                    voornaam,
                    achternaam,
                    gewensdeUsername,
                    email,
                    bedrijfsnaam,
                    kvkNummer,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Als registratie succesvol is, sla het JWT-token op en navigeer naar login
            if (response.status === 201) {
                const token = response.data.token;
                if (token) {
                    sessionStorage.setItem('jwtToken', token);
                }

                setSuccess(true);
                // Reset formuliervelden na succesvolle registratie
                setgewensdeUsername('');
                setVoornaam('');
                setAchternaam('');
                setEmail('');
                setbedrijfsnaam('');
                setkvkNummer('');

                // Navigeer naar login
                setTimeout(() => navigate('/Login'), 2000);
            } else {
                setTimeout(() => navigate('/Login'), 2000);
            }
        } catch (error) {
            // Error handling mislukte register
            console.error('Error during registration:', error);

            if (error.response) {
                // Backendfoutmelding tonen
                if (error.response.data && error.response.data.Errors) {
                    setError(error.response.data.Errors.join(' '));
                } else if (error.response.data && error.response.data.Message) {
                    setError(error.response.data.Message);
                } else {
                    setError('Er is een fout opgetreden tijdens registratie.');
                }
            } else if (error.request) {
                setError('Geen antwoord van de server. Probeer het later opnieuw.');
            } else {
                setError(error.message);
            }
        }
    };

    // Navigatie methode
    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="achtergrond1">
            <WbNavbar />
            <Container fluid className="d-flex justify-content-center align-items-center vh-100">
                <Row>
                    <Col>
                        <div className="RegistratieKaart p-4">
                            <h2 className="text-center mb-4">Wagenpark accounts registreren</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && (
                                <Alert variant="success">
                                    Registratie succesvol! U wordt doorgestuurd naar de login-pagina.
                                </Alert>
                            )}
                            <Form onSubmit={handleRegister}>
                                <Form.Group controlId="formUsername" className="mb-3">
                                    <Form.Label>👤 Gebruikersnaam</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Kies een gebruikersnaam"
                                        value={gewensdeUsername}
                                        onChange={(e) => setgewensdeUsername(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label>📧 E-mail</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        placeholder="Voer uw e-mail in"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formVoornaam" className="mb-3">
                                    <Form.Label>👤 Voornaam</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Voer uw voornaam in"
                                        value={voornaam}
                                        onChange={(e) => setVoornaam(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formAchternaam" className="mb-3">
                                    <Form.Label>👤 Achternaam</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Voer uw achternaam in"
                                        value={achternaam}
                                        onChange={(e) => setAchternaam(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBedrijfsnaam" className="mb-3">
                                    <Form.Label>🏢 Bedrijfsnaam</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Voer uw bedrijfsnaam in"
                                        value={bedrijfsnaam}
                                        onChange={(e) => setbedrijfsnaam(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formKvkNummer" className="mb-3">
                                    <Form.Label>🏢 KvK-nummer</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Voer uw kvknummer in"
                                        value={kvkNummer}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d{0,9}$/.test(value)) {
                                                setkvkNummer(value);
                                            }
                                        }}
                                        maxLength={9}
                                    />
                                </Form.Group>


                                <Button type="submit" className="w-100 knop">
                                    Registreren 🔑
                                </Button>

                            </Form>
                            <div className="mt-3 text-center">
                                <span>
                                    Heeft u al een{' '}
                                    <button
                                        type="button"
                                        onClick={() => handleNavigation('/login')}
                                        className="Link"
                                    >
                                        account
                                    </button>
                                    ?
                                </span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default WbReg;
