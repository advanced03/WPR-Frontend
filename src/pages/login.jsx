import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../style/login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // For handling errors
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent page refresh
        setError(null); // Reset error state

        try {
            const response = await fetch('http://your-backend-url/api/login', { //verander dit naar de echte url van de backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }), // Send JSON payload
            });

            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials.');
            }

            const data = await response.json();
            console.log('Login successful:', data);

            // Navigate to a different page on success (e.g., dashboard)
            navigate('/dashboard');
        } catch (error) {
            setError(error.message); // Display error message
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <div className="achtergrond1"></div>
            <Container className="LoginContainer">
                <Row className="justify-content-center">
                    <Col>
                        <div className="LoginKaart">
                            <h2 className="text-center mb-4">Inloggen</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleLogin}>
                                <Form.Group controlId="formUsername" className="mb-3">
                                    <Form.Label>👤 Gebruikersnaam</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Voer uw gebruikersnaam in"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)} // Update state
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPassword" className="mb-3">
                                    <Form.Label>🔐 Wachtwoord</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Voer uw wachtwoord in"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} // Update state
                                    />
                                </Form.Group>
                                <Button type="submit" className="w-100 knop">
                                    Inloggen 🔓
                                </Button>
                            </Form>
                            <div className="mt-3 text-center">
                                <span>
                                    Heeft u al een{' '}
                                    <button
                                        onClick={() => handleNavigation('/PartRegister')}
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

export default Login;
