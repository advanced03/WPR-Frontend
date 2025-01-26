import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../style/register.css';
import axios from 'axios';

const PartRegister = () => {
    // State voor gebruikersinvoer en fout-/succesberichten
    const [username, setUsername] = useState('');
    const [voornaam, setVoornaam] = useState('');
    const [achternaam, setAchternaam] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    // Registreer de gebruiker en handel de API-aanroep af
    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        // Wachtwoorden validatie
        if (password !== confirmPassword) {
            setError('Wachtwoorden komen niet overeen.');
            return;
        }

        try {
            // API-aanroep voor registratie
            const response = await axios.post(
                `https://localhost:7281/api/account/registerParticulier`,
                { username, email, phoneNumber, voornaam, achternaam, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            // Bij succesvolle registratie, token opslaan en doorverwijzen naar login
            if (response.status === 201) {
                const token = response.data.token;
                if (token) sessionStorage.setItem('jwtToken', token);

                setSuccess(true);
                setTimeout(() => navigate('/Login'), 2000);
            } else {
                setTimeout(() => navigate('/Login'), 2000);
            }
        } catch (error) {
            // Fouten afvangen en tonen
            if (error.response) {
                setError(error.response.data.Errors ? error.response.data.Errors.join(' ') : error.response.data.Message);
            } else {
                setError(error.message || 'Er is een fout opgetreden tijdens registratie.');
            }
        }
    };

    // Navigatie methoden
    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="achtergrond1">
            <Container fluid className="d-flex justify-content-center align-items-center vh-100">
            <Row>
                    <Col>
                        <div className="RegistratieKaart p-4">
                            <h2 className="text-center mb-4">Registreren</h2>
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
                                        onClick={() => handleNavigation('/login')}
                                        className="Link"
                                    >
                                        account
                                    </button>
                                    ?
                                </span>
                            </div>
                            <div className="mt-3 text-center">
                                <span>
                                    wilt u een {' '} aanmaken
                                    <button
                                        type="button"
                                        onClick={() => handleNavigation('/regZakelijk')}
                                        className="Link"
                                    >
                                         zakelijk account
                                    </button>
                                    ?
                                </span>
                            </div>
                            <div className="mt-3 text-center">
                                <span>
                                    wilt u een {' '} aanmaken
                                    <button
                                        type="button"
                                        onClick={() => handleNavigation('/wb')}
                                        className="Link"
                                    >
                                        wagenpark
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
