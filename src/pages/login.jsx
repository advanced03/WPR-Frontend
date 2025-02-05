import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/login.css';
import '../style/universeel.css';

const Login = () => {
    // States initialiseren
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [succes, setSucces] = useState(null);
    const navigate = useNavigate();

    // Inlogfunctie die gegevens naar de server verstuurt
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setSucces(null); // Reset vorige success message
    
        try {
            const response = await axios.post(
                'https://localhost:7281/api/account/Login',
                { username, password },
                { headers: { 'Content-Type': 'application/json' } }
            );
    
            setSucces("Succesvol ingelogd! 🎉 Je wordt doorgestuurd...");
            sessionStorage.setItem('jwtToken', response.data.token);
    
            // Print de JWT-token in de console
            console.log("JWT Token:", response.data.token);
    
            fetchUserData();
    
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Inloggen mislukt. Controleer uw gegevens.');
        }
    };

// Gebruikers data ophalen
    const fetchUserData = async () => {
        setLoading(true);
        const token = sessionStorage.getItem('jwtToken');
        if (!token) return; // Controleer of JWT-token bestaat
    
        try {
            const response = await axios.get('https://localhost:7281/api/account/getUserData', {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('API response:', response.data);
    
            setTimeout(() => {
                if (response.data.role === "particuliereKlant") {
                    navigate("/Home");
                } else if (response.data.role === "wagenparkBeheerder") {
                    navigate("/wbAccountsBeheren");
                } else if (response.data.role === "bedrijfsKlant") {
                    navigate("/Home");
                } else if (response.data.role === "backendWorker") {
                    navigate("/BoWagenparkBeheer");
                } else if (response.data.role === "frontendWorker") {
                    navigate("/FoVoertuigInname");
                }
            }, 1000); // Vertraging van 1 seconde zodat het successbericht te zien is.
    
        } catch (error) {
            console.error('Fout bij ophalen gegevens:', error.response?.data || error.message);
        } finally {
            setLoading(false); // Zorg ervoor dat dit altijd wordt uitgevoerd
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
                            {/* Alert voor zowel succes als error */}
                            {(succes || error) && (
                                <Alert variant={succes ? "success" : "danger"}>
                                    {succes || error}
                                </Alert>
                            )}

                            <h2 className="text-center mb-4">Inloggen</h2>

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
        </div>
    );
};

export default Login;
