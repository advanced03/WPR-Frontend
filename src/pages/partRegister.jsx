import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../style/register.css';
import axios from 'axios';

const PartRegister = () => {
    // State voor gebruikersinvoer en fout-/succesberichten
    const [username, setUsername] = useState('');
    const [voornaam, setVoornaam] = useState('');
    const [achternaam, setAchternaam] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    // Velden controleren of ze goed ingevuld zijn
    const validateFields = () => {
        const errors = {};
        if (!username) errors.username = 'Gebruikersnaam is verplicht.';
        if (!voornaam) errors.voornaam = 'Voornaam is verplicht.';
        if (!achternaam) errors.achternaam = 'Achternaam is verplicht.';
        if (!email || !/\S+@\S+\.\S+/.test(email)) errors.email = 'Voer een geldig e-mailadres in.';
        if (!phoneNumber || !/^\d{10,13}$/.test(phoneNumber)) errors.phoneNumber = 'Voer een geldig telefoonnummer in.';
        if (!password || password.length < 8) errors.password = 'Wachtwoord moet minimaal 8 tekens lang zijn.';
        if (password !== confirmPassword) errors.confirmPassword = 'Wachtwoorden komen niet overeen.';
        return errors;
    };

    // Registratieafhandeling
    const handleRegistration = async (e) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccess(false);

        const errors = validateFields();
        setFieldErrors(errors);

        if (Object.keys(errors).length > 0) return; // Stop als er fouten zijn

        try {
            const payload = {
                username: username,
                email: email,
                password: password,
                voornaam: voornaam,
                achternaam: achternaam,
                phoneNumber: phoneNumber,
            };

            const response = await axios.post(
                `https://localhost:7281/api/account/registerParticulier`,
                payload,
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                const token = response.data.token;
                if (token) sessionStorage.setItem('jwtToken', token);

                setSuccess(true);
                navigate('/Login'); // Directe navigatie naar de login-pagina
            } else {
                setErrorMessage('Registratie mislukt. Probeer het later opnieuw.');
            }

        } catch (err) {
            if (err.response) {
                const serverError = err.response.data.Errors
                    ? err.response.data.Errors.join(' ')
                    : err.response.data.Message || 'Er is een fout opgetreden tijdens registratie.';
                setErrorMessage(serverError);
            } else if (err.request) {
                setErrorMessage('Kan geen verbinding maken met de server. Controleer uw internetverbinding.');
            } else {
                setErrorMessage('Er is een onverwachte fout opgetreden. Probeer het later opnieuw.');
            }
        }
    };

    // Navigatie methode
    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="achtergrond1">
            <Container fluid className="d-flex justify-content-center align-items-center vh-100">
                <Row>
                    <Col>
                        <div className="RegistratieKaart p-4">
                            <h2 className="text-center mb-4">Registreren</h2>
                            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                            {success && (
                                <Alert variant="success">
                                    Registratie succesvol! U wordt doorgestuurd naar de login-pagina.
                                </Alert>
                            )}
                            <Form onSubmit={handleRegistration}>
                                <Form.Group controlId="formUsername" className="mb-3">
                                    <Form.Label>👤 Gebruikersnaam</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Kies een gebruikersnaam"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        isInvalid={!!fieldErrors.username}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {fieldErrors.username}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label>📧 E-mail</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Voer uw e-mail in"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        isInvalid={!!fieldErrors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {fieldErrors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formVoornaam" className="mb-3">
                                    <Form.Label>👤 Voornaam</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Voer uw voornaam in"
                                        value={voornaam}
                                        onChange={(e) => setVoornaam(e.target.value)}
                                        isInvalid={!!fieldErrors.voornaam}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {fieldErrors.voornaam}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formAchternaam" className="mb-3">
                                    <Form.Label>👤 Achternaam</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Voer uw achternaam in"
                                        value={achternaam}
                                        onChange={(e) => setAchternaam(e.target.value)}
                                        isInvalid={!!fieldErrors.achternaam}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {fieldErrors.achternaam}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formPhoneNumber" className="mb-3">
                                    <Form.Label>📱 Telefoonnummer</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="Voer uw telefoonnummer in"
                                        value={phoneNumber}
                                        onChange={(e) => {
                                            const digitsOnly = e.target.value.replace(/\D/g, ''); // Alleen cijfers
                                            if (digitsOnly.length <= 13) {
                                                setPhoneNumber(digitsOnly);
                                            }
                                        }}
                                        isInvalid={!!fieldErrors.phoneNumber}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {fieldErrors.phoneNumber}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formPassword" className="mb-3">
                                    <Form.Label>🔐 Wachtwoord</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Kies een wachtwoord"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        isInvalid={!!fieldErrors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {fieldErrors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formConfirmPassword" className="mb-3">
                                    <Form.Label>🔐 Bevestig Wachtwoord</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Bevestig uw wachtwoord"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        isInvalid={!!fieldErrors.confirmPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {fieldErrors.confirmPassword}
                                    </Form.Control.Feedback>
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
                            <div className="mt-3 text-center">
                                <span>
                                    Wilt u een {' '} 
                                    <button
                                        type="button"
                                        onClick={() => handleNavigation('/WbRegister')}
                                        className="Link"
                                    >
                                        wagenpark
                                    </button>
                                    ?
                                </span>
                            </div>
                            <div className="mt-3 text-center">
                                <span>
                                    Wilt u een {' '} 
                                    <button
                                        type="button"
                                        onClick={() => handleNavigation('/regZakelijk')}
                                        className="Link"
                                    >
                                        zakelijk account
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

export default PartRegister;
