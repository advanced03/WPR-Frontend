import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../style/register.css';
import axios from 'axios';

const PartRegister = () => {
    //States voor invoervelden en eventuele erorrs of bevestigingsberichten.
    const [username, setUsername] = useState('');
    const [voornaam, setVoornaam] = useState('');
    const [achternaam, setAchternaam] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    //Methode om registratie af te handelen.
    const handleRegistration = async (e) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccess(false);

        try {
            //Stuur deze payload naar de backend
            const payload = {
                username: username,
                email: email,
                password: password,
                voornaam: voornaam,
                achternaam: achternaam,
                phoneNumber: phoneNumber,
            };
            //Endpoint die verantwoordelijk is voor het registreren.
            const response = await axios.post(
                `https://localhost:7281/api/account/registerParticulier`,
                payload,
                { headers: { 'Content-Type': 'application/json' } }
            );
            //Als registeren succesvol is
            if (response.status === 200) {
                const token = response.data.token;
                if (token) sessionStorage.setItem('jwtToken', token);

                setSuccess(true);

                // Bericht tonen en vervolgens navigeren naar de loginpagina na 3 seconden
                setTimeout(() => {
                    navigate('/Login');
                }, 3000);
            } else {
                setErrorMessage('Registratie mislukt. Probeer het later opnieuw.');
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

                setErrorMessage(serverError);
            } else if (err.request) {
                setErrorMessage('Er is geen verbinding met de server mogelijk. Controleer uw internetverbinding.');
            } else {
                setErrorMessage('Er is een onverwachte fout opgetreden. Probeer het later opnieuw.');
            }
        }
    };
    // Navigatiemethdoe
    const handleNavigation = (path) => {
        navigate(path);
    };

    //Frontend code
    return (
        <div className="achtergrond1">
            <Container fluid className="d-flex justify-content-center align-items-center vh-100">
                <Row>
                    <Col>
                        <div className="RegistratieKaart p-4">
                            <h2 className="text-center mb-4">Registreren</h2>
                            {/* Danger als het een error is success als het geen error is*/}
                            {errorMessage && <Alert variant="danger" className="alert">{errorMessage}</Alert>}
                            {success && (
                                <Alert variant="success">
                                    Uw account is succesvol aangemaakt! U wordt binnen 3 seconden teruggestuurd naar de loginpagina.
                                </Alert>
                            )}
                            <Form onSubmit={handleRegistration}>
                                <Form.Group controlId="formUsername" className="mb-3">
                                    <Form.Label>👤 Gebruikersnaam</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Kies een gebruikersnaam"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label>📧 E-mail</Form.Label>
                                    {/*Validatie van email*/}
                                    <Form.Control
                                        type="email"
                                        placeholder="Voer uw e-mail in"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        isInvalid={!/\S+@\S+\.\S+/.test(email)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Voer een geldig e-mailadres in.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formVoornaam" className="mb-3">
                                    <Form.Label>👤 Voornaam</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Voer uw voornaam in"
                                        value={voornaam}
                                        onChange={(e) => setVoornaam(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formAchternaam" className="mb-3">
                                    <Form.Label>👤 Achternaam</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Voer uw achternaam in"
                                        value={achternaam}
                                        onChange={(e) => setAchternaam(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                {/*Validatie van telefoon nummer & alleen cijfers.*/}
                                <Form.Group controlId="formPhoneNumber" className="mb-3">
                                    <Form.Label>📱 Telefoonnummer</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="Voer uw telefoonnummer in"
                                        value={phoneNumber}
                                        onChange={(e) => {
                                            const digitsOnly = e.target.value.replace(/\D/g, '');
                                            if (digitsOnly.length <= 13) {
                                                setPhoneNumber(digitsOnly);
                                            }
                                        }}
                                        required
                                        isInvalid={!/^\d{10,13}$/.test(phoneNumber)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Voer een geldig telefoonnummer in.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formPassword" className="mb-3">
                                    <Form.Label>🔐 Wachtwoord</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Kies een wachtwoord"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={8}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Wachtwoord moet minimaal 8 tekens lang zijn.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formConfirmPassword" className="mb-3">
                                    <Form.Label>🔐 Bevestig Wachtwoord</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Bevestig uw wachtwoord"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        isInvalid={password !== confirmPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Wachtwoorden komen niet overeen.
                                    </Form.Control.Feedback>
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

export default PartRegister;
