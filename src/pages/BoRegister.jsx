import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BoNavbar from "../components/BoNavbar.jsx";

const BoRegister = () => {
    const [rol, setRol] = useState('frontoffice'); // Default role
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        // Validate inputs
        if (password !== confirmPassword) {
            setError('Wachtwoorden komen niet overeen.');
            return;
        }

        try {
            const payload = {
                rol,
                username,
                email,
                password,
            };

            const response = await fetch('http://your-backend-url/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload), 
            });

            if (!response.ok) {
                throw new Error('Registratie mislukt. Probeer het opnieuw.');
            }

            setSuccess(true); // Indicate success
            setTimeout(() => navigate('/Login'), 2000);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleLoginRedirect = (path) => {
        navigate(path);
    };

    return (
        <div className="achtergrond1">
            <BoNavbar/>
            <Container className="RegistratieContainer">
                <Row className="justify-content-center">
                    <Col>
                        <div className="RegistratieKaart">
                            <h2 className="text-center mb-4">Backoffice Medewerker Registratie</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && (
                                <Alert variant="success">
                                    Registratie succesvol! U wordt doorgestuurd naar de login-pagina.
                                </Alert>
                            )}
                            <Form onSubmit={handleRegister}>
                                <Form.Group controlId="formRol" className="mb-3">
                                    <Form.Label>🛢 Rol</Form.Label>
                                    <Form.Select
                                        value={rol}
                                        onChange={(e) => setRol(e.target.value)}
                                    >
                                        <option value="frontoffice">Frontoffice Medewerker</option>
                                        <option value="backoffice">Backoffice Medewerker</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group controlId="formUsername" className="mb-3">
                                    <Form.Label>👤 Gebruikersnaam</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Kies een gebruikersnaam"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label>📧 E-Mail</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Voer uw e-mail in"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formPassword" className="mb-3">
                                    <Form.Label>🔐 Wachtwoord</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Kies een wachtwoord"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formConfirmPassword" className="mb-3">
                                    <Form.Label>🔐 Bevestig wachtwoord</Form.Label>
                                    <Form.Control
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
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default BoRegister;