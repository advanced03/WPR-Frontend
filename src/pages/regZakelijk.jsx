import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../style/register.css';
import axios from 'axios';

const RegZak = () => {
    const [username, setUsername] = useState('');
    const [voornaam, setVoornaam] = useState('');
    const [achternaam, setAchternaam] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigeren = useNavigate();

    const registreren = async (e) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccess(false);

        // Controleer of wachtwoorden overeenkomen
        if (password !== confirmPassword) {
            setErrorMessage('Wachtwoorden komen niet overeen.');
            return;
        }

        // Controleer op lege velden
        if (!username || !voornaam || !achternaam || !email || !phoneNumber || !password) {
            setErrorMessage('Alle velden zijn verplicht.');
            return;
        }

        try {
            const gegevens = {
                username,
                voornaam,
                achternaam,
                email,
                phoneNumber,
                password,
            };

            const antwoord = await axios.post(
                `https://localhost:7281/api/Account/registerZakelijk`,
                gegevens,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            if (antwoord.status === 200) {
                setSuccess(true);
                setUsername('');
                setVoornaam('');
                setAchternaam('');
                setEmail('');
                setPhoneNumber('');
                setPassword('');
                setConfirmPassword('');
                setTimeout(() => navigeren('/Login'), 2000);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.Message || 'Er is een fout opgetreden.');
            } else {
                setErrorMessage('Kan geen verbinding maken met de server. Probeer later opnieuw.');
            }
        }
    };

    const filterPhoneNumber = (waarde) => {
        const alleenCijfers = waarde.replace(/\D/g, ''); // Verwijder niet-cijferkarakters
        if (alleenCijfers.length <= 13) { // Controleer of het maximaal 13 cijfers bevat
            setPhoneNumber(alleenCijfers);
        }
    };    

    const navigatie = (pad) => {
        navigeren(pad);
    };

    return (
        <div className="achtergrond1">
            <Container fluid className="d-flex justify-content-center align-items-center vh-100">
                <Row>
                    <Col>
                        <div className="RegistratieKaart p-4">
                            <h2 className="text-center mb-4">Zakelijk account registreren</h2>
                            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                            {success && (
                                <Alert variant="success">
                                    Registratie succesvol! U wordt doorgestuurd naar de login-pagina.
                                </Alert>
                            )}
                            <Form onSubmit={registreren}>
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
                                        type="tel"
                                        placeholder="Voer uw telefoonnummer in"
                                        value={phoneNumber}
                                        onChange={(e) => filterPhoneNumber(e.target.value)}
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
                                        onClick={() => navigatie('/Login')}
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
