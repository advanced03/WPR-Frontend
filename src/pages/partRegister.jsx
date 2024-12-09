import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../style/register.css';

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
        e.preventDefault(); // Prevent page refresh
        setError(null);
        setSuccess(false);

        // Validate passwords
        if (password !== confirmPassword) {
            setError('Wachtwoorden komen niet overeen.');
            return;
        }

        try {
            const response = await fetch('http://your-backend-url/api/register', { //zet hier de echte link van de backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, phone, password }), // Send JSON payload
            });

            if (!response.ok) {
                throw new Error('Registratie mislukt. Probeer het opnieuw.');
            }

            setSuccess(true); // Indicate success
            setUsername('');
            setEmail('');
            setPhone('');
            setPassword('');
            setConfirmPassword('');

            // Navigate to the login page after registration
            setTimeout(() => navigate('/login'), 2000); // Wait for 2 seconds before redirecting
        } catch (error) {
            setError(error.message); // Show error message
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <div className="achtergrond"></div>
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
                                    <Form.Label>Gebruikersnaam</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Kies een gebruikersnaam"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Voer uw e-mail in"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPhone" className="mb-3">
                                    <Form.Label>Telefoonnummer</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="Voer uw telefoonnummer in"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPassword" className="mb-3">
                                    <Form.Label>Wachtwoord</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Kies een wachtwoord"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formConfirmPassword" className="mb-3">
                                    <Form.Label>Bevestig wachtwoord</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Bevestig uw wachtwoord"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Button type="submit" className="w-100">
                                    Registreren
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
