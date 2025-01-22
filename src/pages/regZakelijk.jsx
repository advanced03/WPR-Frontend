import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../style/register.css';
import axios from 'axios';

const RegZak = () => {
    // State hooks voor het beheren van formuliergegevens en foutmeldingen
    const [username, setUsername] = useState('');
    const [voornaam, setVoornaam] = useState('');
    const [achternaam, setAchternaam] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null); // Voor foutmeldingen
    const [success, setSuccess] = useState(false); // Voor het succesbericht na registratie
    const navigate = useNavigate(); // Gebruik voor navigatie naar een andere pagina

    // Functie die wordt aangeroepen bij het indienen van het registratieformulier
    const handleRegister = async (e) => {
        e.preventDefault(); // Voorkomt het standaard herladen van de pagina bij formulierinzending
        setError(null); // Foutmelding resetten
        setSuccess(false); // Succesbericht resetten

        // Controleer of de wachtwoorden overeenkomen
        if (password !== confirmPassword) {
            setError('Wachtwoorden komen niet overeen.'); // Zet foutmelding als wachtwoorden niet overeenkomen
            return; // Stop de functie als de wachtwoorden niet overeenkomen
        }

        try {
            // Payload voor het registratieverzoek
            const payload = {
                username,
                email,
                password,
                voornaam,
                achternaam,
                phoneNumber,
            };

            console.log('Payload:', payload); // Log de payload voor debugging

            // Verstuur de registratiegegevens naar de API
            const response = await axios.post(
                `https://localhost:7281/api/Account/registerZakelijk`,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json', // Zet de content type header voor JSON
                    },
                }
            );

            // Controleer of de registratie succesvol was (status 201)
            if (response.status === 201) {
                setSuccess(true); // Zet het succesbericht

                // Leeg de invoervelden na succesvolle registratie
                setUsername('');
                setVoornaam('');
                setAchternaam('');
                setEmail('');
                setPhoneNumber('');
                setPassword('');
                setConfirmPassword('');

                // Na 2 seconden naar de login-pagina navigeren
                setTimeout(() => {
                    navigate('/Login'); // Navigeer naar login-pagina
                }, 2000);
            }
        } catch (error) {
            console.error('Error during registration:', error); // Log eventuele fouten in de console

            // Foutafhandelingslogica
            if (error.response) {
                // Fout van de server
                if (error.response.data && error.response.data.Message) {
                    setError(error.response.data.Message); // Toon specifieke foutmelding
                } else {
                    setError('Er is een fout opgetreden tijdens registratie.'); // Algemene foutmelding
                }
            } else if (error.request) {
                // Geen antwoord van de server
                setError('Geen antwoord van de server. Probeer het later opnieuw.');
            } else {
                // Fout in de configuratie van het verzoek
                setError(error.message); // Toon de foutmelding
            }
        }
    };

    // Functie om naar een andere pagina te navigeren
    const handleNavigation = (path) => {
        navigate(path); // Navigeer naar de opgegeven path
    };

    return (
        <div className="achtergrond1">
            <Container fluid className="d-flex justify-content-center align-items-center vh-100">
                <Row>
                    <Col>
                        <div className="RegistratieKaart p-4">
                            <h2 className="text-center mb-4">Zakelijk account registreren</h2>
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
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
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

                                <Form.Group controlId="formPhoneNumber" className="mb-3">
                                    <Form.Label>📱 Telefoonnummer</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Voer uw telefoonnummer in"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formPassword" className="mb-3">
                                    <Form.Label>🔐 Wachtwoord</Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        placeholder="Kies een wachtwoord"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formConfirmPassword" className="mb-3">
                                    <Form.Label>🔐 Bevestig wachtwoord</Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        placeholder="Bevestig uw wachtwoord"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                                        onClick={() => handleNavigation('/Login')}
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

export default RegZak;
