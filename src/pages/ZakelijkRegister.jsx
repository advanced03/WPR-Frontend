import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import '../style/register.css';

const ZakelijkRegister = () => {
    const [rol, setRol] = useState('frontoffice'); // Standaard instellen op Frontoffice
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/Login');
    };

    return (
        <Container className="RegistratieContainer">
            <Row className="justify-content-center">
                <Col>
                    <div className="RegistratieKaart">
                        <h2 className="text-center mb-4">Zakelijk Registreren</h2>
                        <Form>
                            <Form.Group controlId="formRol" className="mb-3">
                                <Form.Label>Rol</Form.Label>
                                <Form.Select 
                                    value={rol} 
                                    onChange={(e) => setRol(e.target.value)}
                                >
                                    <option value="frontoffice">Frontoffice Medewerker</option>
                                    <option value="backoffice">Backoffice Medewerker</option>
                                    <option value="wagenparkbeheerder">Wagenpark Beheerder</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId="formUsername" className="mb-3" required>
                                <Form.Label>Gebruikersnaam</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Kies een gebruikersnaam" 
                                />
                                <Form.Control.Feedback type="invalid">Voer een gebruikersnaam in.</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Voer uw e-mail in" 
                                />
                            </Form.Group>

                            {rol === 'wagenparkbeheerder' && (
                                <Form.Group controlId="formBedrijfEmail" className="mb-3">
                                    <Form.Label>Bedrijf E-mail Tag</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Voer uw E-Mail tag in (@bedrijf)" 
                                    />
                                </Form.Group>
                            )}

                            <Form.Group controlId="formBedrijfsnaam" className="mb-3">
                                <Form.Label>Bedrijfsnaam</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Voer uw bedrijfsnaam in" 
                                />
                            </Form.Group>

                            <Form.Group controlId="formPhone" className="mb-3">
                                <Form.Label>Telefoonnummer</Form.Label>
                                <Form.Control 
                                    type="tel" 
                                    placeholder="Voer uw telefoonnummer in" 
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Wachtwoord</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Kies een wachtwoord" 
                                />
                            </Form.Group>

                            <Form.Group controlId="formConfirmPassword" className="mb-3">
                                <Form.Label>Bevestig wachtwoord</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Bevestig uw wachtwoord" 
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100">
                                Registreren
                            </Button>
                        </Form>

                        <div className="mt-3 text-center">
                            <span>Heeft u al een <button onClick={handleLoginRedirect} className="LoginLink">account</button>?</span>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ZakelijkRegister;
