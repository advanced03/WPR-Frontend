import React from 'react';
import { Container, Row, Col, Form, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import '../style/huren.css';

function AutoZoeken() {
    return (
            <div className="huren-container">
                <Container fluid className="d-flex justify-content-center align-items-center huren-background">
                    <Row>
                        <Col className="huren-box mx-3 p-5">
                            <h1 className="text-center huren-titel mb-3">Huren</h1>
                            <Form>
                                <Form.Group className="mb-3 text-center">
                                    <Form.Label className="mb-3">Kies het type voertuig dat u wilt huren:</Form.Label>
                                    <div className="toggle-center">
                                        <ToggleButtonGroup type="radio" name="voertuigType" defaultValue={"Auto"} className="mb-3">
                                            <ToggleButton id="auto" value="Auto" variant="outline-primary" className="toggle-knop">Auto</ToggleButton>
                                            <ToggleButton id="caravan" value="Caravan" variant="outline-primary" className="toggle-knop">Caravan</ToggleButton>
                                            <ToggleButton id="camper" value="Camper" variant="outline-primary" className="toggle-knop">Camper</ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="mb-2">Van</Form.Label>
                                    <Form.Control type="date" placeholder="Kies een startdatum" className="mb-3" />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="mb-2">Tot</Form.Label>
                                    <Form.Control type="date" placeholder="Kies een einddatum" className="mb-3" />
                                </Form.Group>

                                {/* Als er geen auto's worden gevonden moet dit een error geven als er auto's worden gevonden door naar de AutoVinden pagina. */}
                                <div className="d-flex justify-content-center">
                                    <Button className="knop mt-3">
                                        Zoeken 🔍
                                    </Button>
                                </div>

                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
    );
}

export default AutoZoeken;