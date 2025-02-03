import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../style/register.css';
import axios from 'axios';

const WbRegister = () => {
    // Usestates initializeren
    const [gewensdeUsername, setgewensdeUsername] = useState('');
    const [voornaam, setVoornaam] = useState('');
    const [achternaam, setAchternaam] = useState('');
    const [email, setEmail] = useState('');
    const [bedrijfsnaam, setbedrijfsnaam] = useState('');
    const [kvkNummer, setkvkNummer] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    // Verwerking van register formulier
    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            //Endpoint die verantwoordelijk is voor het registreren.
            const response = await axios.put(
                `https://localhost:7281/api/Account/NieuwWagenParkVerzoek`,
                {
                    voornaam,
                    achternaam,
                    gewensdeUsername,
                    email,
                    bedrijfsnaam,
                    kvkNummer,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Als registratie succesvol is, sla het JWT-token op en navigeer naar login
            if (response.status === 200) {
                const token = response.data.token;
                if (token) {
                    sessionStorage.setItem('jwtToken', token);
                }

                setSuccess(true);

                // Bericht tonen en vervolgens navigeren naar de loginpagina na 3 seconden
                setTimeout(() => {
                    navigate('/Login');
                }, 10000);
            } else {
                setError('Registratie mislukt. Probeer het later opnieuw.');
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

                setError(serverError);
            } else if (err.request) {
                setError('Er is geen verbinding met de server mogelijk. Controleer uw internetverbinding.');
            } else {
                setError('Er is een onverwachte fout opgetreden. Probeer het later opnieuw.');
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
                            <h2 className="text-center mb-4">Wagenpark accounts registreren</h2>
                            {/* Danger als het een error is success als het geen error is*/}
                            {error && <Alert variant="danger" className="alert">{error}</Alert>}
                            {success && (
                                <Alert variant="success">
                                    👍 Uw verzoek voor het aanmaken van een nieuw wagenparkbeheerder-account is succesvol verstuurd!
                                    Een CarAndAll backoffice-medewerker zal dit zo snel mogelijk beoordelen.
                                    U wordt binnen 10 seconden teruggestuurd naar de loginpagina...
                                </Alert>

                            )}
                            <Form onSubmit={handleRegister}>
                                <Form.Group controlId="formUsername" className="mb-3">
                                    <Form.Label>👤 Gebruikersnaam</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Kies een gebruikersnaam"
                                        value={gewensdeUsername}
                                        onChange={(e) => setgewensdeUsername(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label>📧 E-mail</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        placeholder="Voer uw e-mail in"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        isInvalid={email && !/\S+@\S+\.\S+/.test(email)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Voer een geldig e-mailadres in.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formVoornaam" className="mb-3">
                                    <Form.Label>👤 Voornaam</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Voer uw voornaam in"
                                        value={voornaam}
                                        onChange={(e) => setVoornaam(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formAchternaam" className="mb-3">
                                    <Form.Label>👤 Achternaam</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Voer uw achternaam in"
                                        value={achternaam}
                                        onChange={(e) => setAchternaam(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBedrijfsnaam" className="mb-3">
                                    <Form.Label>🏢 Bedrijfsnaam</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Voer uw bedrijfsnaam in"
                                        value={bedrijfsnaam}
                                        onChange={(e) => setbedrijfsnaam(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formKvkNummer" className="mb-3">
                                    <Form.Label>🏢 KvK-nummer</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Voer uw kvknummer in"
                                        value={kvkNummer}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d{0,9}$/.test(value)) {
                                                setkvkNummer(value);
                                            }
                                        }}
                                        maxLength={9}
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

export default WbRegister;
