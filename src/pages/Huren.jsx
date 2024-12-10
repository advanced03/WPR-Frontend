import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import '../style/huren.css';

const Huren = () => {
    const [voertuig, setVoertuig] = useState('');
    const [startDatum, setStartDatum] = useState('');
    const [eindDatum, setEindDatum] = useState('');
    const [error, setError] = useState('');
    const [succes, setSucces] = useState(false);

    const handleHuren = (e) => {
        e.preventDefault();
        if (voertuig === '' || startDatum === '' || eindDatum === '') {
            setError('Vul alle velden in.');
            setSucces(false);
        } else {
            setError('');
            setSucces(true);
            // Nog een snel begin nog niet de eindversie!
        }
    };

    return (
        <>
            <div className="achtergrond"></div>
            <Container>
                <Row className="justify-content-center align-items-center vh-100">
                    <Col xs={12} sm={8} md={6} lg={4}>
                        <div
                            className="HuurBox p-4 rounded shadow"
                        >
                            <h2 className="text-center mb-4">Auto Huren</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {succes && <Alert variant="success">Reservering succesvol!</Alert>}
                            <Form onSubmit={handleHuren}>
                                <Form.Group controlId="formVoertuig" className="mb-3">
                                    <Form.Label>Kies een voertuig</Form.Label>
                                    <Form.Select
                                        value={voertuig}
                                        onChange={(e) => setVoertuig(e.target.value)}
                                    >
                                        <option value="">Selecteer een voertuig</option>
                                        <option value="auto">Auto</option>
                                        <option value="camper">Camper</option>
                                        <option value="caravan">Caravan</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId="formStartDatum" className="mb-3">
                                    <Form.Label>Startdatum</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={startDatum}
                                        onChange={(e) => setStartDatum(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEindDatum" className="mb-3">
                                    <Form.Label>Einddatum</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={eindDatum}
                                        onChange={(e) => setEindDatum(e.target.value)}
                                    />
                                </Form.Group>
                                <Button type="submit" className="w-100">
                                    Reserveren
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Huren;
