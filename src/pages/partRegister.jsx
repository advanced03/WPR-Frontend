import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import '../style/register.css';
import '../style/achtergrond.css';

const Register = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <Container className="register-container">
            <Row className="justify-content-center">
                <Col md={6} lg={4}>
                    <div className="register-card">
                        <h2 className="text-center mb-4">Registreren</h2>
                        <Form>
                            <Form.Group controlId="formUsername" className="mb-3">
                                <Form.Label>Gebruikersnaam</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Kies een gebruikersnaam" 
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Voer uw e-mail in" 
                                />
                            </Form.Group>
                            <Form.Group controlId="formPhone" className="mb-3">
                                <Form.Label>Telefoonnummer</Form.Label>
                                <Form.Control 
                                    type="tel" 
                                    placeholder="Voer uw telefoonnummer in" 
                                    pattern="^(?:\31|0)[1-9]{1}[0-9]{8}$"
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
                            <span>Heeft u al een <button onClick={handleLoginRedirect} className="link-to-login">account</button>?</span>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
