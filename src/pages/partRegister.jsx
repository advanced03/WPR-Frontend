import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../style/register.css';
import axios from 'axios';

const partRegister = () => {
    // State voor gebruikersinvoer en fout-/succesberichten
    const [gebruikersnaam, setGebruikersnaam] = useState('');
    const [voornaam, setVoornaam] = useState('');
    const [achternaam, setAchternaam] = useState('');
    const [email, setEmail] = useState('');
    const [telefoonnummer, setTelefoonnummer] = useState('');
    const [wachtwoord, setWachtwoord] = useState('');
    const [bevestigWachtwoord, setBevestigWachtwoord] = useState('');
    const [foutmelding, setFoutmelding] = useState(null);
    const [veldFouten, setVeldFouten] = useState({});
    const [succesvol, setSuccesvol] = useState(false);
    const navigeer = useNavigate();

    // Velden controleren of ze wel goed ingevuld zijn
    const valideerVelden = () => {
        const fouten = {};
        if (!gebruikersnaam) fouten.gebruikersnaam = 'Gebruikersnaam is verplicht.';
        if (!voornaam) fouten.voornaam = 'Voornaam is verplicht.';
        if (!achternaam) fouten.achternaam = 'Achternaam is verplicht.';
        if (!email || !/\S+@\S+\.\S+/.test(email)) fouten.email = 'Voer een geldig e-mailadres in.';
        if (!telefoonnummer || !/^\d{10,13}$/.test(telefoonnummer)) fouten.telefoonnummer = 'Voer een geldig telefoonnummer in';
        if (!wachtwoord || wachtwoord.length < 8) fouten.wachtwoord = 'Wachtwoord moet minimaal 8 tekens lang zijn.';
        if (wachtwoord !== bevestigWachtwoord) fouten.bevestigWachtwoord = 'Wachtwoorden komen niet overeen.';
        return fouten;
    };

    // Registratieafhandeling
    const verwerkRegistratie = async (e) => {
        e.preventDefault();
        setFoutmelding(null);
        setSuccesvol(false);

        const fouten = valideerVelden();
        setVeldFouten(fouten);

        if (Object.keys(fouten).length > 0) return; // Stop als er fouten zijn

        try {
            const reactie = await axios.post(
                `https://localhost:5188/api/account/registerParticulier`,
                { gebruikersnaam, email, telefoonnummer, voornaam, achternaam, wachtwoord },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (reactie.status === 201) {
                const token = reactie.data.token;
                if (token) sessionStorage.setItem('jwtToken', token);

                setSuccesvol(true);
                setTimeout(() => navigeer('/Login'), 2000);
            } else {
                setFoutmelding('Registratie mislukt. Probeer het later opnieuw.');
            }
        } catch (err) {
            if (err.response) {
                const serverFout = err.response.data.Errors
                    ? err.response.data.Errors.join(' ')
                    : err.response.data.Message || 'Er is een fout opgetreden tijdens registratie.';
                setFoutmelding(serverFout);
            } else if (err.request) {
                setFoutmelding('Kan geen verbinding maken met de server. Controleer uw internetverbinding.');
            } else {
                setFoutmelding('Er is een onverwachte fout opgetreden. Probeer het later opnieuw.');
            }
        }
    };

    // Navigatie methode
    const navigeerNaar = (pad) => {
        navigeer(pad);
    };

    return (
        <div className="achtergrond1">
            <Container fluid className="d-flex justify-content-center align-items-center vh-100">
                <Row>
                    <Col>
                        <div className="RegistratieKaart p-4">
                            <h2 className="text-center mb-4">Registreren</h2>
                            {foutmelding && <Alert variant="danger">{foutmelding}</Alert>}
                            {succesvol && (
                                <Alert variant="success">
                                    Registratie succesvol! U wordt doorgestuurd naar de login-pagina.
                                </Alert>
                            )}
                            <Form onSubmit={verwerkRegistratie}>
                                <Form.Group controlId="formGebruikersnaam" className="mb-3">
                                    <Form.Label>👤 Gebruikersnaam</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Kies een gebruikersnaam"
                                        value={gebruikersnaam}
                                        onChange={(e) => setGebruikersnaam(e.target.value)}
                                        isInvalid={!!veldFouten.gebruikersnaam}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {veldFouten.gebruikersnaam}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label>📧 E-mail</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Voer uw e-mail in"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        isInvalid={!!veldFouten.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {veldFouten.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formVoornaam" className="mb-3">
                                    <Form.Label>👤 Voornaam</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Voer uw voornaam in"
                                        value={voornaam}
                                        onChange={(e) => setVoornaam(e.target.value)}
                                        isInvalid={!!veldFouten.voornaam}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {veldFouten.voornaam}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formAchternaam" className="mb-3">
                                    <Form.Label>👤 Achternaam</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Voer uw achternaam in"
                                        value={achternaam}
                                        onChange={(e) => setAchternaam(e.target.value)}
                                        isInvalid={!!veldFouten.achternaam}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {veldFouten.achternaam}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formTelefoonnummer" className="mb-3">
                                    <Form.Label>📱 Telefoonnummer</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="Voer uw telefoonnummer in"
                                        value={telefoonnummer}
                                        onChange={(e) => {
                                            const alleenCijfers = e.target.value.replace(/\D/g, ''); // Verwijdert alles wat geen numerieke waarden zijn.
                                            if (alleenCijfers.length <= 13) {
                                                setTelefoonnummer(alleenCijfers);
                                            }
                                        }}
                                        isInvalid={!!veldFouten.telefoonnummer}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {veldFouten.telefoonnummer}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formWachtwoord" className="mb-3">
                                    <Form.Label>🔐 Wachtwoord</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Kies een wachtwoord"
                                        value={wachtwoord}
                                        onChange={(e) => setWachtwoord(e.target.value)}
                                        isInvalid={!!veldFouten.wachtwoord}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {veldFouten.wachtwoord}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formBevestigWachtwoord" className="mb-3">
                                    <Form.Label>🔐 Bevestig Wachtwoord</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Bevestig uw wachtwoord"
                                        value={bevestigWachtwoord}
                                        onChange={(e) => setBevestigWachtwoord(e.target.value)}
                                        isInvalid={!!veldFouten.bevestigWachtwoord}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {veldFouten.bevestigWachtwoord}
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
                                        onClick={() => navigeerNaar('/login')}
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

export default partRegister;
