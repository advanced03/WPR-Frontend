import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './login.css'; // Importeer je custom CSS

const Login = () => {
    return (
        <Container className="login-container">
            <Row className="justify-content-center">
                <Col md={6} lg={4}>
                    <div className="login-card">
                        <h2 className="text-center mb-4">Inloggen</h2>
                        <Form>
                            <Form.Group controlId="formUsername" className="mb-3">
                                <Form.Label>Gebruikersnaam</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Voer je gebruikersnaam in" 
                                />
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Wachtwoord</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Voer je wachtwoord in" 
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100">
                                Inloggen
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
