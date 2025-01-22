import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ButtonGroup, Form } from 'react-bootstrap';
import axios from 'axios';
import '../style/huren.css';
import '../style/knop.css';
import PartNavbar from "../components/PartNavbar.jsx";

const AutoVinden = () => {
    // Usestates initializeren
    const [selectedType, setSelectedType] = useState('auto');
    const [searchTerm, setSearchTerm] = useState('');
    const [wagens, setWagens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const navigate = useNavigate();

    // Functie om de data van de API op te halen
    //  Log de ontvangen data om te controleren
    //  Zet de ontvangen data in de state
    //  Schakel de loading state uit
    useEffect(() => {
        const fetchWagens = async () => {
            try {
                const response = await axios.get('https://localhost:7281/api/voertuigen/AllVoertuigen');
                console.log('Response Data:', response.data);
                setWagens(response.data);
                setLoading(false);
            } catch (error) {
                setError('Er is een fout opgetreden bij het ophalen van de voertuigen.');
                // Stop de loading state bij een error
                setLoading(false);
            }
        };

        fetchWagens();
    }, []);

    const handleSelecteren = (type) => {
        setSelectedType(type);
    };

    const handleZoeken = (e) => {
        setSearchTerm(e.target.value);
    };
    // Sla de geselecteerde wagen op in de sessionstorage en controleert of er wat in sessionstorage zit.
    const handleRentClick = (wagen) => {
        sessionStorage.setItem('selectedWagen', JSON.stringify(wagen));
        const storedWagen = JSON.parse(sessionStorage.getItem('selectedWagen'));
        console.log(storedWagen);
        // Navigeren naar een andere pagina
        navigate('/Huurverzoek');
    };

    // Methode om voertuigen te filteren voor de zoekbalk
    const filteredWagens = wagens.filter(wagen =>
        wagen.soort === selectedType &&
        (wagen.merk.toLowerCase().includes(searchTerm.toLowerCase()) ||
            wagen.type.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleStartDateChange = (e) => setStartDate(e.target.value);
    const handleEndDateChange = (e) => setEndDate(e.target.value);
    // Laat "Loading..." zien tijdens het ophalen van data.
    if (loading) {
        return <div>Loading...</div>;
    }
    // Toon een foutmelding als er iets misgaat.
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="achtergrond2">
            <PartNavbar />
            <Container fluid className="p-2 my-4">
                <h1 className="pagina-titel text-center my-4">Kies een Voertuig om te Huren</h1>
                {/* Zoekbalk methode */}
                <div className="huren-box text-center mt-5 p-5">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Zoek voertuigen..."
                        value={searchTerm}
                        onChange={handleZoeken}
                    />
                    {/*Verander de variant van de knop als deze geselecteerd wordt*/}
                    <ButtonGroup className="my-5 knoppengroep">
                        <Button
                            variant={selectedType === 'auto' ? 'secondary' : 'outline-light'}
                            onClick={() => handleSelecteren('auto')}
                        >
                            Auto 🚗
                        </Button>
                        <Button
                            variant={selectedType === 'caravan' ? 'secondary' : 'outline-light'}
                            onClick={() => handleSelecteren('caravan')}
                        >
                            Caravan ⛺
                        </Button>
                        <Button
                            variant={selectedType === 'camper' ? 'secondary' : 'outline-light'}
                            onClick={() => handleSelecteren('camper')}
                        >
                            Camper 🚐
                        </Button>
                    </ButtonGroup>
                    {/*Van en tot datum row*/}
                    <Row>
                        <Col sm={6} className="px-2 p-2">
                            <Form.Group controlId="startDate">
                                <Form.Label>Van Datum</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={6} className="px-2 p-2">
                            <Form.Group controlId="endDate">
                                <Form.Label>Tot Datum</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </div>

                {/*Toon een bericht als er geen resultaten zijn.*/}
                <Row className="my-5 p-5 autovinden">
                    {filteredWagens.length === 0 ? (
                        <div className="no-results">Geen voertuigen gevonden!</div>
                    ) : (
                        filteredWagens.map(wagen => (
                            <Col key={wagen.voertuigId} sm={12} md={6} lg={4} className="mb-4">
                                <Card className="h-100 p-2 mb-3">
                                    <Card.Body>
                                        <Card.Title>{wagen.merk} {wagen.type}</Card.Title>
                                        <p>Kleur: {wagen.kleur}</p>
                                        <p>prijs: ${50}</p>
                                        <p>Type: {wagen.soort}</p>
                                        <p>Kenteken: {wagen.kenteken}</p>
                                        <p>Aanschafjaar: {wagen.aanschafJaar}</p>
                                        <Button className="knop mt-3" onClick={() => handleRentClick(wagen)}>
                                            Huren 🚗
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default AutoVinden;
