import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../style/register.css';
import axios from 'axios';
import BoNavbar from "../components/BoNavbar"

const BoRegister = () => {
    // Usestates initializeren
    const [username, setUsername] = useState('');
    const [voornaam, setVoornaam] = useState('');
    const [achternaam, setAchternaam] = useState('');
    const [email, setEmail] = useState('');
    const [typeAccount, settypeAccount] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        // Controleer of het wachtwoord overeenkomt
        if (password !== confirmPassword) {
            setError('Wachtwoorden komen niet overeen.');
            return;
        }

        try {
            console.log('Payload:', {
                username,
                email,
                typeAccount,
                password,
            });

            const response = await axios.post(
                `https://localhost:7281/api/BackOfficeMedewerker/registerBackendAndFrontend`,
                {
                    username,
                    email,
                    typeAccount,
                    password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            //Als registeren succesvol is
            if (response.status === 200) {
                const token = response.data.token;
                if (token) sessionStorage.setItem('jwtToken', token);

                setSuccess(true);

                // Bericht tonen en vervolgens navigeren naar de loginpagina na 3 seconden
                setTimeout(() => {
                    navigate('/BoWagenparkBeheer');
                }, 3000);                
            } else {
                setError('Registratie mislukt. Probeer het later opnieuw.');
            }
            // Bij een gefaalde registratie actie laat de volgende berichten zien:
        } catch (err) {
            if (err.response) {
                const serverError = err.response.data.Errors
                    ? err.response.data.Errors.join('\n')
                    : err.response.data.Message ||
                    '❗ Er is een probleem opgetreden bij uw registratie. Controleer alstublieft het volgende:\n' +
                    '🔑 Uw wachtwoord is minimaal 12 tekens lang.\n' +
                    '🔠 Uw wachtwoord bevat minimaal één hoofdletter (A-Z).\n' +
                    '🔢 Uw wachtwoord bevat minimaal één cijfer (0-9).\n' +
                    '🔒 Uw wachtwoord bevat minimaal één speciaal teken.';

                setError(serverError);
            } else if (err.request) {
                setError('Er is geen verbinding met de server mogelijk. Controleer uw internetverbinding.');
            } else {
                setError('Er is een onverwachte fout opgetreden. Probeer het later opnieuw.');
            }
        }
    };

    return (
        <div className="achtergrond1">
            <BoNavbar />
            <Container fluid className="d-flex justify-content-center align-items-center vh-100">
                <Row>
                    <Col>
                        <div className="RegistratieKaart p-4">
                            <h2 className="text-center mb-4">Nieuwe Front/Back office accounts Registreren</h2>
                            {/* Danger als het een error is success als het geen error is*/}
                            {errorMessage && <Alert variant="danger" className="alert">{errorMessage}</Alert>}
                            {success && (
                                <Alert variant="success">
                                    👍 Uw account is succesvol aangemaakt! U wordt binnen 3 seconden teruggestuurd naar de loginpagina.
                                </Alert>
                            )}
                            <Form onSubmit={handleRegister}>
                                <Form.Group controlId="formUsername" className="mb-3">
                                    <Form.Label>👤 Gebruikersnaam</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Kies een gebruikersnaam"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label>📧 E-Mail</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        placeholder="Voer uw e-mail in"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formAccountType" className="mb-3">
                                    <Form.Label>👤 Kies Accounttype</Form.Label>
                                    <Form.Control
                                        as="select"
                                        required
                                        value={typeAccount}
                                        onChange={(e) => settypeAccount(e.target.value)}
                                    >
                                        <option value="BackendWorker">Backoffice Medewerker</option>
                                        <option value="FrontendWorker">Frontoffice Medewerker</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formPassword" className="mb-3">
                                    <Form.Label>🔐 Wachtwoord</Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        placeholder="Kies een wachtwoord"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        minLength={12}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Wachtwoord moet minimaal 12 tekens lang zijn.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formConfirmPassword" className="mb-3">
                                    <Form.Label>🔐 Bevestig wachtwoord</Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        placeholder="Bevestig uw wachtwoord"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        isInvalid={password !== confirmPassword}
                                    />
                                </Form.Group>
                                <Button type="submit" className="w-100 knop">
                                    Registreren 🔑
                                </Button>

                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default BoRegister;
