import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../style/register.css';
import axios from 'axios';

const WbReg = () => {
    const [username, setUsername] = useState('');
    const [voornaam, setVoornaam] = useState('');
    const [achternaam, setAchternaam] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [bedrijfsnaam, setbedrijfsnaam] = useState('');
    const [bedrijfsString, setbedrijfsString] = useState('');
    const [kvkNummer, setkvkNummer] = useState('');
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
            console.log('Payload:', {
                username,
                email,
                voornaam,
                achternaam,
                password,
                phoneNumber,
                bedrijfsnaam,
                bedrijfsString,
                kvkNummer,
            });

            const response = await axios.post(
                `https://localhost:7281/api/BackOfficeMedewerker/registerWagenparkBeheerder`,
                {
                    username,
                    email,
                    voornaam,
                    achternaam,
                    password,
                    phoneNumber,
                    bedrijfsnaam,
                    bedrijfsString,
                    kvkNummer,
                },
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

                setSuccess(true);
                setUsername('');
                setVoornaam('');
                setAchternaam('');
                setEmail('');
                setbedrijfsnaam('');
                setbedrijfsString('');
                setphoneNumber('');
                setkvkNummer('')
                setPassword('');
                setConfirmPassword('');

                // Navigeren naar de login-pagina
                setTimeout(() => navigate('/Login'), 2000);
            } else {
                setTimeout(() => navigate('/Login'), 2000);
            }
        } catch (error) {
            console.error('Error during registration:', error);

            if (error.response) {
                // Foutmelding van de backend weergeven
                if (error.response.data && error.response.data.Errors) {
                    // Dit is meestal het geval bij ModelState-validatie fouten
                    setError(error.response.data.Errors.join(' '));
                } else if (error.response.data && error.response.data.Message) {
                    // Specifieke foutmelding van de backend
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


    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="achtergrond1">
            <Container className="Registratiecontainer">
                <Row className="justify-content-center scrollable-table-container">
                    <Col>
                        <div className="RegistratieKaart">
                            <h2 className="text-center mb-4">wagenpark accounts registreren</h2>
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
                                <Form.Group controlId="formVoornaam" className="mb-3">
                                    <Form.Label>voornaam</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Voer uw accounttype in"
                                        value={voornaam}
                                        onChange={(e) => setVoornaam(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formVoornaam" className="mb-3">
                                    <Form.Label>achternaam</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Voer uw achternaam in"
                                        value={achternaam}
                                        onChange={(e) => setAchternaam(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formVoornaam" className="mb-3">
                                    <Form.Label>bedrijfsnaam</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Voer uw bedrijfsnaam in"
                                        value={bedrijfsnaam}
                                        onChange={(e) => setbedrijfsnaam(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formVoornaam" className="mb-3">
                                    <Form.Label>voornaam</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Voer uw @organisatie in"
                                        value={bedrijfsString}
                                        onChange={(e) => setbedrijfsString(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formVoornaam" className="mb-3">
                                    <Form.Label>voornaam</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        placeholder="Voer uw kvknummer in"
                                        value={kvkNummer}
                                        onChange={(e) => setkvkNummer(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formVoornaam" className="mb-3">
                                    <Form.Label>telefoonnummer</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        placeholder="Voer uw telefoonnummer in"
                                        value={phoneNumber}
                                        onChange={(e) => setphoneNumber(e.target.value)}
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
        </div>
    );
};

export default WbReg;