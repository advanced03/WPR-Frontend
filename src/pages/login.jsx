import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import '../style/login.css';
import '../style/achtergrond.css';

const Login = () => {
    const navigate = useNavigate();

    const handlePartRegisterDirect = () => {
        navigate('/PartRegister');
    };

    return (
        <Container className="LoginContainer">
            <Row className="justify-content-center">
                <Col md={6} lg={4}>
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
                            <span>Heeft u nog <button onClick={handlePartRegisterDirect} className="LoginLink">geen account</button>?</span>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
