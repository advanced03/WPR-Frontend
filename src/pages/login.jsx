import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/login.css';
import '../style/universeel.css';

const Login = () => {
    const [username, setUsername] = useState(''); // Gebruikersnaam state
    const [password, setPassword] = useState(''); // Wachtwoord state
    const [error, setError] = useState(null); // Algemene foutmelding
    const [fieldErrors, setFieldErrors] = useState({ username: '', password: '' }); // Foutmeldingen per veld
    const navigate = useNavigate();

    // Inlogfunctie die gegevens naar de server verstuurt
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setFieldErrors({ username: '', password: '' }); // Foutmeldingen resetten

        // Validatie van lege velden
        if (!username || !password) {
            setFieldErrors({
                username: username ? '' : 'Gebruikersnaam is verplicht.',
                password: password ? '' : 'Wachtwoord is verplicht.',
            });
            return;
        }

        try {
            const response = await axios.post(
                'https://localhost:5188/api/account/Login',
                { username, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                const token = response.data.token;
                if (token) {
                    sessionStorage.setItem('jwtToken', token);
                }
                console.log('Login successful:', response.data);
                navigate('/Home'); // Navigeer naar Home-pagina
            } else {
                throw new Error('Inloggen mislukt. Controleer uw inloggegevens.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            if (error.response) {
                // Specifieke foutmeldingen op basis van de statuscode
                switch (error.response.status) {
                    case 401:
                        setError('Onjuiste gebruikersnaam of wachtwoord.');
                        break;
                    case 403:
                        setError('U heeft geen toegang.');
                        break;
                    case 500:
                        setError('Er is een serverfout opgetreden. Probeer het later opnieuw.');
                        break;
                    default:
                        setError('Er is een fout opgetreden. Probeer het later opnieuw.');
                }
            } else {
                setError('Kan geen verbinding maken met de server.');
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
                            {error && <Alert variant="danger">{error}</Alert>} {/* Algemene foutmelding */}
                            <Form onSubmit={handleLogin}>
                                <Form.Group controlId="formUsername" className="mb-3">
                                    <Form.Label>👤 Gebruikersnaam</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Voer uw gebruikersnaam in"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        isInvalid={!!fieldErrors.username} // Markeer veld als ongeldig
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {fieldErrors.username} {/* Toon foutmelding onder het veld */}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formPassword" className="mb-3">
                                    <Form.Label>🔐 Wachtwoord</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Voer uw wachtwoord in"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        isInvalid={!!fieldErrors.password} // Markeer veld als ongeldig
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {fieldErrors.password} {/* Toon foutmelding onder het veld */}
                                    </Form.Control.Feedback>
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
