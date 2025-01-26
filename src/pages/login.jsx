import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/login.css';
import '../style/universeel.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const token = sessionStorage.getItem('jwtToken');

    // Functie om de rol van de gebruiker op te halen na succesvolle login
    const fetchUserRole = async (token) => {
        try {
            const response = await axios.get('https://localhost:7281/api/account/getUserData', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userRole = response.data.role;

            // Navigeer naar de juiste pagina op basis van de rol
            switch (userRole) {
                case 'backendWorker':
                    navigate('/BoHuurVerzoekBehandeling');
                    break;
                case 'wagenparkBeheerder':
                    navigate('/WbAccountsBeheren');
                    break;
                case 'particuliereKlant':
                    navigate('/Home');
                    break;
                case 'frontendWorker':
                    navigate('/FoVoertuigInname');
                    break;
                case 'bedrijfsKlant':
                    navigate('/Home');
                    break;
                default:
                    console.log('Onbekende rol:', userRole);
                    break;
            }
        } catch (error) {
            console.error('Fout bij het ophalen van gebruikersgegevens:', error);
            setError('Er is een probleem met het ophalen van gebruikersgegevens.');
        }
    };

    useEffect(() => {
        // Als het token beschikbaar is, haal dan de gebruikersrol op
        if (token) {
            fetchUserRole(token);
        }
    }, [token]);  // Effect wordt uitgevoerd wanneer token is ingesteld

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setFieldErrors({ username: '', password: '' });

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
                'https://localhost:7281/api/account/Login',
                { username, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                const token = response.data.token;
                if (token) {
                    sessionStorage.setItem('jwtToken', token);  // Sla het token op in sessionStorage
                    console.log('Login successful:', response.data);
                }
            } else {
                throw new Error('Inloggen mislukt. Controleer uw inloggegevens.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            if (error.response) {
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

    return (
        <div className="achtergrond1">
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
                                        isInvalid={!!fieldErrors.username}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {fieldErrors.username}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formPassword" className="mb-3">
                                    <Form.Label>🔐 Wachtwoord</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Voer uw wachtwoord in"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        isInvalid={!!fieldErrors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {fieldErrors.password}
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
                                        onClick={() => navigate('/PartRegister')}
                                        className="Link"
                                    >
                                        account
                                    </button>
                                    ?
                                </span>
                            </div>
                            <div className="mt-3 text-center">
                                <span>
                                    Bent u een{' '}
                                    <button
                                        onClick={() => navigate('/PartRegister')}
                                        className="Link"
                                    >
                                        zakelijke klant
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
