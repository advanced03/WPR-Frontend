import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../style/register.css';
import axios from 'axios';


// Miss een bericht laten zien als het account succesvol is aangemaakt?

const PartRegister = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        // Wachtwoorden controleren
        if (password !== confirmPassword) {
            setError('Wachtwoorden komen niet overeen.');
            return;
        }

        try {
            const response = await axios.post(`https://localhost:7281/api/account/registerParticulier`, {
                username,
                email,
                phone,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) { // 201 Created
                setSuccess(true); // Indicate success
                setUsername('');
                setEmail('');
                setPhone('');
                setPassword('');
                setConfirmPassword('');

                // Navigate to the login page after registration
                setTimeout(() => navigate('/login'), 2000); // Wait for 2 seconds before redirecting
            } else {
                setTimeout(() => navigate('/login'), 2000); // Wait for 2 seconds before redirecting
            }
        } catch (error) {
            console.error('Error during registration:', error);
            if (error.response) {
                // Server error
                setError(error.response.data.message || 'Er is een fout opgetreden tijdens registratie.');
            } else if (error.request) {
                // No response from server
                setError('Geen antwoord van de server. Probeer het later opnieuw.');
            } else {
                // Other errors
                setError(error.message);
            }
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <div className="achtergrond1"></div>
            <Container className="RegistratieContainer">
                <Row className="justify-content-center">
                    <Col>
                        <div className="RegistratieKaart">
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
                                    <Form.Label>📧 E-Mail</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        placeholder="Voer uw e-mail in"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPhone" className="mb-3">
                                    <Form.Label>📞 Telefoonnummer</Form.Label>
                                    <Form.Control
                                        required
                                        type="tel"
                                        placeholder="Voer uw telefoonnummer in"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
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
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default PartRegister;
