import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    ButtonGroup,
    Alert,
    Spinner,
} from "react-bootstrap";
import axios from "axios";
import "../style/huren.css";
import "../style/universeel.css";
import PartNavbar from "../components/PartNavbar.jsx";

function AutoZoeken() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [availableCars, setAvailableCars] = useState([]);

    const handleSearch = async () => {
        setError(null);
        setAvailableCars([]);
        setLoading(true);

        try {
            const response = await axios.get("https://localhost:7281/api/voertuigen/AllAutos", {
                params: {
                    startDate,
                    endDate,
                },
            });

            if (response.status === 200 && response.data.length > 0) {
                setAvailableCars(response.data);
            } else {
                setError("Geen auto's beschikbaar op de geselecteerde datums.");
            }
        } catch (err) {
            console.error("Error fetching cars:", err);
            setError("Er is een fout opgetreden bij het ophalen van de beschikbare auto's.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="achtergrond2">
            <PartNavbar />
            <Container
                fluid
                className="d-flex justify-content-center align-items-center container-center"
            >
                <Row>
                    <Col className="huren-box p-5">
                        <h1 className="text-center huren-titel mb-3">Huren</h1>
                        <Form>
                            <Form.Group className="mb-3 text-center">
                                <Form.Label className="mb-4">
                                    Kies het type voertuig dat u wilt huren:
                                </Form.Label>
                                <div className="toggle-center">
                                    <ButtonGroup className="mb-3">
                                        <Button className="knop">Auto 🚗</Button>
                                        <Button className="knop" disabled>
                                            Caravan ⛺
                                        </Button>
                                        <Button className="knop" disabled>
                                            Camper 🚐
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label className="mb-2">Van</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    placeholder="Kies een startdatum"
                                    className="mb-3"
                                />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label className="mb-2">Tot</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    placeholder="Kies een einddatum"
                                    className="mb-3"
                                />
                            </Form.Group>

                            <div className="d-flex justify-content-center">
                                <Button
                                    className="knop mt-3"
                                    onClick={handleSearch}
                                    disabled={!startDate || !endDate || loading}
                                >
                                    {loading ? <Spinner animation="border" size="sm" /> : "Zoeken 🔍"}
                                </Button>
                            </div>
                        </Form>

                        {error && (
                            <Alert variant="danger" className="mt-3">
                                {error}
                            </Alert>
                        )}

                        {availableCars.length > 0 && (
                            <div className="mt-4">
                                <h5>Beschikbare auto's:</h5>
                                <ul>
                                    {availableCars.map((car) => (
                                        <li key={car.id}>
                                            {car.make} {car.model} ({car.year})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AutoZoeken;
