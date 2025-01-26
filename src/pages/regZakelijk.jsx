import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../style/register.css';
import axios from 'axios';

const RegZak = () => {
    const [gebruikersnaam, setGebruikersnaam] = useState('');
    const [voornaam, setVoornaam] = useState('');
    const [achternaam, setAchternaam] = useState('');
    const [email, setEmail] = useState('');
    const [telefoonnummer, setTelefoonnummer] = useState('');
    const [wachtwoord, setWachtwoord] = useState('');
    const [bevestigWachtwoord, setBevestigWachtwoord] = useState('');
    const [foutmelding, setFoutmelding] = useState(null);
    const [succes, setSucces] = useState(false);
    const navigeren = useNavigate();

    const registreren = async (e) => {
        e.preventDefault();
        setFoutmelding(null);
        setSucces(false);

        // Controleer of wachtwoorden overeenkomen
        if (wachtwoord !== bevestigWachtwoord) {
            setFoutmelding('Wachtwoorden komen niet overeen.');
            return;
        }

        // Controleer op lege velden
        if (!gebruikersnaam || !voornaam || !achternaam || !email || !telefoonnummer || !wachtwoord) {
            setFoutmelding('Alle velden zijn verplicht.');
            return;
        }

        try {
            const gegevens = {
                username: gebruikersnaam,
                voornaam,
                achternaam,
                email,
                phoneNumber: telefoonnummer,
                password: wachtwoord,
            };

            const antwoord = await axios.post(
                `https://localhost:7281/api/Account/registerZakelijk`,
                gegevens,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            if (antwoord.status === 201) {
                setSucces(true);
                setGebruikersnaam('');
                setVoornaam('');
                setAchternaam('');
                setEmail('');
                setTelefoonnummer('');
                setWachtwoord('');
                setBevestigWachtwoord('');
                setTimeout(() => navigeren('/Login'), 2000);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setFoutmelding(error.response.data.Message || 'Er is een fout opgetreden.');
            } else {
                setFoutmelding('Kan geen verbinding maken met de server. Probeer later opnieuw.');
            }
        }
    };

    const filterTelefoonnummer = (waarde) => {
        const alleenCijfers = waarde.replace(/\D/g, ''); // Verwijder niet-cijferkarakters
        if (alleenCijfers.length <= 13) { // Controleer of het maximaal 13 cijfers bevat
            setTelefoonnummer(alleenCijfers);
        }
    };    

    const navigatie = (pad) => {
        navigeren(pad);
    };

    return (
        <div className="achtergrond1">
            <Container fluid className="d-flex justify-content-center align-items-center vh-100">
                <Row>
                    <Col>
                        <div className="RegistratieKaart p-4">
                            <h2 className="text-center mb-4">Zakelijk account registreren</h2>
                            {foutmelding && <Alert variant="danger">{foutmelding}</Alert>}
                            {succes && (
                                <Alert variant="success">
                                    Registratie succesvol! U wordt doorgestuurd naar de login-pagina.
                                </Alert>
                            )}
                            <Form onSubmit={registreren}>
                                <Form.Group controlId="formGebruikersnaam" className="mb-3">
                                    <Form.Label>👤 Gebruikersnaam</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Kies een gebruikersnaam"
                                        value={gebruikersnaam}
                                        onChange={(e) => setGebruikersnaam(e.target.value)}
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
                                    />
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

                                <Form.Group controlId="formTelefoonnummer" className="mb-3">
                                    <Form.Label>📱 Telefoonnummer</Form.Label>
                                    <Form.Control
                                        required
                                        type="tel"
                                        placeholder="Voer uw telefoonnummer in"
                                        value={telefoonnummer}
                                        onChange={(e) => filterTelefoonnummer(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formWachtwoord" className="mb-3">
                                    <Form.Label>🔐 Wachtwoord</Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        placeholder="Kies een wachtwoord"
                                        value={wachtwoord}
                                        onChange={(e) => setWachtwoord(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBevestigWachtwoord" className="mb-3">
                                    <Form.Label>🔐 Bevestig wachtwoord</Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        placeholder="Bevestig uw wachtwoord"
                                        value={bevestigWachtwoord}
                                        onChange={(e) => setBevestigWachtwoord(e.target.value)}
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
                                        onClick={() => navigatie('/Login')}
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

export default RegZak;
