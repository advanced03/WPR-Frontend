import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('https://localhost:7281/api/account/Login', { username, password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('Login successful:', response.data);

                navigate('/AutoZoeken');
            } else {
                throw new Error('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError(error.message);
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
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPassword" className="mb-3">
                                    <Form.Label>🔐 Wachtwoord</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Voer uw wachtwoord in"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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
        </>
    );
};

export default Login;
