import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BoNavbar from "../components/BoNavbar.jsx";
import axios from 'axios';

const BoRegister = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [typeAccount, setTypeAccount] = useState('FrontendWorker'); // Default account type 'FrontendWorker'
    const [bedrijfsnaam, setBedrijfsnaam] = useState('');
    const [bedrijfsString, setBedrijfsString] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        // Validate passwords
        if (password !== confirmPassword) {
            setError('Wachtwoorden komen niet overeen.');
            return;
        }

        try {
            const payload = {
                username,
                email,
                password,
                typeAccount,  // 'FrontendWorker' or 'BackendWorker'
                bedrijfsnaam,
                bedrijfsString
            };

            // API call to register the user
            const response = await axios.post(
                'https://localhost:7281/manualRegister',  // Update to your actual API endpoint
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 201) {
                // JWT-token opslaan in sessionStorage
                const token = response.data.token;
                if (token) {
                    sessionStorage.setItem('jwtToken', token);
                }

                setSuccess(true); // Registration successful
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setBedrijfsnaam('');
                setBedrijfsString('');

                // Redirect to login page after 2 seconds
                setTimeout(() => navigate('/Login'), 2000);
            } else {
                {/*setError('Er is een probleem opgetreden bij de registratie.');*/}
                setTimeout(() => navigate('/Login'), 2000);
            }
        } catch (error) {
            console.error('Error during registration:', error);

            if (error.response) {
                console.error('Response from server:', error.response.data);  // Log de response van de server

                // Handle error messages from backend
                if (error.response.data && error.response.data.Errors) {
                    setError(error.response.data.Errors.join(' '));
                } else if (error.response.data && error.response.data.Message) {
                    setError(error.response.data.Message);
                } else {
                    setError('Er is een fout opgetreden tijdens registratie.');
                }
            } else if (error.request) {
                setError('Geen antwoord van de server. Probeer het later opnieuw.');
            } else {
                setError(error.message);
            }
        }
    };

    return (
        <div className="achtergrond1">
            <BoNavbar />
            <Container fluid className="d-flex justify-content-center align-items-center vh-100">
                <Row>
                    <Col>
                        <div className="RegistratieKaart p-4">
                            <h2 className="text-center mb-4">Registratie</h2>
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

                                <Form.Group controlId="formTypeAccount" className="mb-3">
                                    <Form.Label>🛠 Type Account</Form.Label>
                                    <Form.Select
                                        value={typeAccount}
                                        onChange={(e) => setTypeAccount(e.target.value)}
                                    >
                                        <option value="FrontendWorker">Frontoffice Medewerker</option>
                                        <option value="BackendWorker">Backoffice Medewerker</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group controlId="formBedrijfsnaam" className="mb-3">
                                    <Form.Label>🏢 Bedrijfsnaam</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Voer de bedrijfsnaam in"
                                        value={bedrijfsnaam}
                                        onChange={(e) => setBedrijfsnaam(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBedrijfsString" className="mb-3">
                                    <Form.Label>🏢 Bedrijf String</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Voer de bedrijfsstring in"
                                        value={bedrijfsString}
                                        onChange={(e) => setBedrijfsString(e.target.value)}
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
