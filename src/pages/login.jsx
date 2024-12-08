import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../style/login.css';

const Login = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
      navigate(path);
    };

    return (
        <>
            <div className="achtergrond"></div>
            <Container className="LoginContainer">
                <Row className="justify-content-center">
                    <Col>
                        <div className="LoginKaart">
                            <h2 className="text-center mb-4">Inloggen</h2>
                            <Form>
                                <Form.Group controlId="formUsername" className="mb-3">
                                    <Form.Label>Gebruikersnaam</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Voer uw gebruikersnaam in"
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPassword" className="mb-3">
                                    <Form.Label>Wachtwoord</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Voer uw wachtwoord in"
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    Inloggen
                                </Button>
                            </Form>
                            <div className="mt-3 text-center">
                                <span>Heeft u al een <button onClick={() => handleNavigation('/PartRegister')} className="LoginLink">account</button>?</span>
                            </div>

                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Login;
