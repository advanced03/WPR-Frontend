import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/login.css';
import '../style/universeel.css';

const Login = () => {
    const [username, setUsername] = useState('');  // Gebruikersnaam state
    const [password, setPassword] = useState('');  // Wachtwoord state
    const [error, setError] = useState(null);  // Errormelding state
    const navigate = useNavigate();

    // Inlogfunctie die gegevens naar de server verstuurt
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);  // Reset foutmelding

        try {
            const response = await axios.post(
                'https://localhost:7281/api/account/Login',
                { username, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                // Sla het JWT-token op in sessionStorage
                const token = response.data.token;
                if (token) {
                    sessionStorage.setItem('jwtToken', token);
                }

                console.log('Login successful:', response.data);

                // Navigeer naar de Home-pagina
                navigate('/Home');
            } else {
                throw new Error('Inloggen mislukt. Controleer uw inloggegevens.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);  // Toon foutmelding van de server
            } else {
                setError('Er is een fout opgetreden tijdens het inloggen.');  // Algemene foutmelding
            }
        }
    };

    // Functie voor navigeren naar andere pagina's
    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="achtergrond1">
            <Container className="LoginContainer">
                <Row className="justify-content-center">
                    <Col>
                        <div className="LoginKaart">
                            <h2 className="text-center mb-4">Inloggen</h2>
                            {error && <Alert variant="danger">{error}</Alert>}  // Toon foutmelding als er is
                            <Form onSubmit={handleLogin}>
                                <Form.Group controlId="formUsername" className="mb-3">
                                    <Form.Label>👤 Gebruikersnaam</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Voer uw gebruikersnaam in"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}  // Update gebruikersnaam
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPassword" className="mb-3">
                                    <Form.Label>🔐 Wachtwoord</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Voer uw wachtwoord in"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}  // Update wachtwoord
                                    />
                                </Form.Group>
                                <Button type="submit" className="w-100 knop" disabled={!username || !password}>
                                    Inloggen 🔓
                                </Button>
                            </Form>
                            <div className="mt-3 text-center">
                                <span>
                                    Heeft u nog geen{' '}
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
        </div>
    );
};

export default Login;
