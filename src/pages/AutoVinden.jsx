import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ButtonGroup, Form } from 'react-bootstrap';
import axios from 'axios';
import '../style/huren.css';
import '../style/knop.css';
import PartNavbar from "../components/PartNavbar.jsx";

const AutoVinden = () => {
    const [selectedType, setSelectedType] = useState('auto');
    const [searchTerm, setSearchTerm] = useState('');
    const [wagens, setWagens] = useState([]); // Lege lijst voor de voertuigen
    const [loading, setLoading] = useState(true); // Voor het tonen van een laadindicatie
    const [error, setError] = useState(null); // Voor het afhandelen van errors
    const [startDate, setStartDate] = useState(''); // State voor de van datum
    const [endDate, setEndDate] = useState(''); // State voor de tot datum
    const navigate = useNavigate();

    useEffect(() => {
        // Functie om de data van de API op te halen
        const fetchWagens = async () => {
            try {
                const response = await axios.get('https://localhost:7281/api/voertuigen/AllVoertuigen');
                console.log('Response Data:', response.data); // Log de ontvangen data om te controleren
                setWagens(response.data); // Zet de ontvangen data in state
                setLoading(false); // Stop de loading state
            } catch (error) {
                setError('Er is een fout opgetreden bij het ophalen van de voertuigen.');
                setLoading(false); // Stop de loading state bij error
            }
        };

        fetchWagens();
    }, []); // Deze useEffect wordt maar één keer uitgevoerd, bij het laden van de component

    const handleSelect = (type) => {
        setSelectedType(type);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleRentClick = (wagen) => {
        // Sla de geselecteerde wagen op in sessionStorage
        sessionStorage.setItem('selectedWagen', JSON.stringify(wagen));
        const storedWagen = JSON.parse(sessionStorage.getItem('selectedWagen'));
        console.log(storedWagen); // Controleer wat er in sessionStorage zit

        // Optioneel: Navigeren naar een andere pagina, bijvoorbeeld naar een huurpagina
        navigate('/Huurverzoek');
    };

    // Filter de voertuigen op type en zoekterm
    const filteredWagens = wagens.filter(wagen =>
        wagen.soort === selectedType && // Gebruik 'soort' voor filtering, niet 'type'
        (wagen.merk.toLowerCase().includes(searchTerm.toLowerCase()) || // Filter op merk
            wagen.type.toLowerCase().includes(searchTerm.toLowerCase())) // Filter op type
    );

    const handleStartDateChange = (e) => setStartDate(e.target.value);
    const handleEndDateChange = (e) => setEndDate(e.target.value);

    if (loading) {
        return <div>Loading...</div>; // Toon "Loading..." tijdens het ophalen van data
    }

    if (error) {
        return <div>{error}</div>; // Toon foutmelding als er iets misgaat
    }

    return (
        <div className="achtergrond2">
            <PartNavbar />
            <Container fluid className="p-2 my-4">
                <h1 className="pagina-titel text-center my-4">Kies een Voertuig om te Huren</h1>

                <div className="huren-box text-center mt-5 p-5">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Zoek voertuigen..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />

                    <ButtonGroup className="my-5 knoppengroep">
                        <Button
                            variant={selectedType === 'auto' ? 'secondary' : 'outline-light'}
                            onClick={() => handleSelect('auto')}
                        >
                            Auto 🚗
                        </Button>
                        <Button
                            variant={selectedType === 'caravan' ? 'secondary' : 'outline-light'}
                            onClick={() => handleSelect('caravan')}
                        >
                            Caravan ⛺
                        </Button>
                        <Button
                            variant={selectedType === 'camper' ? 'secondary' : 'outline-light'}
                            onClick={() => handleSelect('camper')}
                        >
                            Camper 🚐
                        </Button>
                    </ButtonGroup>

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

                {/* Vehicle Grid */}
                <Row className="my-5 p-5 autovinden">
                    {filteredWagens.length === 0 ? (
                        <div className="no-results">Geen voertuigen gevonden!</div> // Toon bericht als geen resultaten
                    ) : (
                        filteredWagens.map(wagen => (
                            <Col key={wagen.voertuigId} sm={12} md={6} lg={4} className="mb-4">
                                <Card className="h-100 p-2 mb-3">
                                    <Card.Body>
                                        <Card.Title>{wagen.merk} {wagen.type}</Card.Title>
                                        <p>Kleur: {wagen.kleur}</p>
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
