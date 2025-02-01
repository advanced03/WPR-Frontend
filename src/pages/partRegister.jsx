import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../style/register.css';
import axios from 'axios';

const PartRegister = () => {
    //States voor invoervelden en eventuele erorrs of bevestigingsberichten.
    const [gebruikersnaam, setgebruikersnaam] = useState('');
    const [voornaam, setVoornaam] = useState('');
    const [achternaam, setAchternaam] = useState('');
    const [email, setEmail] = useState('');
    const [telefoonnummer, setTelefoonnummer] = useState('');
    const [wachtwoord, setwachtwoord] = useState('');
    const [bevestigWachtwoord, setBevestigWachtwoord] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigeren = useNavigate();

    //Methode om registratie af te handelen.
    const registreren = async (e) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccess(false);

        try {
            //Stuur deze payload naar de backend
            const payload = {
                username: gebruikersnaam,
                email: email,
                password: wachtwoord,
                voornaam: voornaam,
                achternaam: achternaam,
                phoneNumber: telefoonnummer,
            };
            //Endpoint die verantwoordelijk is voor het registreren.
            const response = await axios.post(
                `https://localhost:7281/api/account/registerParticulier`,
                payload,
                { headers: { 'Content-Type': 'application/json' } }
            );

            //Als registeren succesvol is
            if (response.status === 200) {
                const token = response.data.token;
                if (token) sessionStorage.setItem('jwtToken', token);

                setSuccess(true);

                // Bericht tonen en vervolgens navigeren naar de loginpagina na 3 seconden
                setTimeout(() => {
                    navigatie('/Login');
                }, 3000);
            } else {
                setErrorMessage('Registratie mislukt. Probeer het later opnieuw.');
            }
            // Bij een gefaalde registratie actie laat de volgende berichten zien:
        } catch (err) {
            if (err.response) {
                const serverError = err.response.data.Errors
                    ? err.response.data.Errors.join('\n')
                    : err.response.data.Message ||
                    '❗ Er is een probleem opgetreden bij uw registratie. Controleer alstublieft het volgende:\n' +
                    '🔑 Uw wachtwoord is minimaal 12 tekens lang.\n' +
                    '🔠 Uw wachtwoord bevat minimaal één hoofdletter (A-Z).\n' +
                    '🔢 Uw wachtwoord bevat minimaal één cijfer (0-9).\n' +
                    '🔒 Uw wachtwoord bevat minimaal één speciaal teken.';

                setErrorMessage(serverError);
            } else if (err.request) {
                setErrorMessage('Er is geen verbinding met de server mogelijk. Controleer uw internetverbinding.');
            } else {
                setErrorMessage('Er is een onverwachte fout opgetreden. Probeer het later opnieuw.');
            }
        }
    };
    
    // Navigatiemethdoe
    const navigatie = (pad) => {
        navigeren(pad);
    };

    //Frontend code
    return (
        <div className="achtergrond1">
            <Container fluid className="d-flex justify-content-center align-items-center vh-100">
                <Row>
                    <Col>
                        <div className="RegistratieKaart p-4">
                            <h2 className="text-center mb-4">Registreren</h2>
                            {/* Danger als het een error is success als het geen error is*/}
                            {errorMessage && <Alert variant="danger" className="alert">{errorMessage}</Alert>}
                            {success && (
                                <Alert variant="success">
                                    👍 Uw account is succesvol aangemaakt! U wordt binnen 3 seconden teruggestuurd naar de loginpagina.
                                </Alert>
                            )}
                            <Form onSubmit={registreren}>
                                <Form.Group controlId="formgebruikersnaam" className="mb-3">
                                    <Form.Label>👤 Gebruikersnaam</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Kies een gebruikersnaam"
                                        value={gebruikersnaam}
                                        onChange={(e) => setgebruikersnaam(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label>📧 E-mail</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Voer uw e-mail in"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        isInvalid={email && !/\S+@\S+\.\S+/.test(email)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Voer een geldig e-mailadres in.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formVoornaam" className="mb-3">
                                    <Form.Label>👤 Voornaam</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Voer uw voornaam in"
                                        value={voornaam}
                                        onChange={(e) => setVoornaam(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formAchternaam" className="mb-3">
                                    <Form.Label>👤 Achternaam</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Voer uw achternaam in"
                                        value={achternaam}
                                        onChange={(e) => setAchternaam(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formtelefoonnummer" className="mb-3">
                                    <Form.Label>📱 Telefoonnummer</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="Voer uw telefoonnummer in"
                                        value={telefoonnummer}
                                        onChange={(e) => {
                                            const digitsOnly = e.target.value.replace(/\D/g, '');
                                            if (digitsOnly.length <= 13) {
                                                setTelefoonnummer(digitsOnly);
                                            }
                                        }}
                                        required
                                        isInvalid={telefoonnummer && !/^\d{10,13}$/.test(telefoonnummer)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Voer een geldig telefoonnummer in.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formwachtwoord" className="mb-3">
                                    <Form.Label>🔐 Wachtwoord</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Kies een wachtwoord"
                                        value={wachtwoord}
                                        onChange={(e) => setwachtwoord(e.target.value)}
                                        required
                                        minLength={12}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Wachtwoord moet minimaal 12 tekens lang zijn.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formbevestigWachtwoord" className="mb-3">
                                    <Form.Label>🔐 Bevestig Wachtwoord</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Bevestig uw wachtwoord"
                                        value={bevestigWachtwoord}
                                        onChange={(e) => setBevestigWachtwoord(e.target.value)}
                                        required
                                        isInvalid={wachtwoord !== bevestigWachtwoord}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Wachtwoorden komen niet overeen.
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
                                        onClick={() => navigatie('/login')}
                                        className="Link"
                                    >
                                        account
                                    </button>
                                    ?
                                </span>
                            </div>
                            <div className="mt-3 text-center">
                                <span>
                                    Wilt u zich registreren als {' '}
                                    <button
                                        type="button"
                                        onClick={() => navigatie('/WbRegister')}
                                        className="Link"
                                    >
                                        wagenpark beheerder
                                    </button>
                                    ?
                                </span>
                            </div>
                            <div className="mt-3 text-center">
                                <span>
                                    Wilt u zich registreren als een{' '}
                                    <button
                                        type="button"
                                        onClick={() => navigatie('/regZakelijk')}
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

export default PartRegister;
