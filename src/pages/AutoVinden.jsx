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
    const [loading, setLoading] = useState(true); // Laad indicator
    const [error, setError] = useState(null); // Error afhandeling
    const [startDate, setStartDate] = useState(''); // State voor datum
    const [endDate, setEndDate] = useState(''); // State voor de tot datum
    const navigate = useNavigate();

    // Functie om de data van de API op te halen
    useEffect(() => {
        const fetchWagens = async () => {
            try {
                const response = await axios.get('https://localhost:7281/api/voertuigen/AllVoertuigen');
                console.log('Response Data:', response.data);
                setWagens(response.data);
                setLoading(false);
            } catch (error) {
                setError('Er is een fout opgetreden bij het ophalen van de voertuigen.');
                setLoading(false);
            }
        };

        fetchWagens();
    }, []);

    const handleFetchByDate = async () => {
        if (!startDate || !endDate) {
            setError('Vul zowel een begin- als einddatum in.');
            return;
        }

        setLoading(true); // Zet de laadstatus op true terwijl we de voertuigen ophalen
        try {
            console.log('Dates:',
                {                params: {
                startDate: startDate,
                endDate: endDate
            }
            });
            const response = await axios.get('https://localhost:7281/api/voertuigen/GetVoertuigByDate', {
                params: {
                startDate: startDate,
                endDate: endDate
            }
        });
            console.log('Response Data:', response.data);
            setWagens(response.data); // Update de wagens met de opgehaalde data
            setError(null); // Reset de error als het ophalen succesvol is
        } catch (error) {
            setError('Er is een fout opgetreden bij het ophalen van voertuigen op basis van de datums.');
        } finally {
            setLoading(false); // Zet de laadstatus terug naar false
        }
    };

    const handleSelect = (type) => {
        setSelectedType(type);
    };

    const handleSearchChange = (e) => {
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
                    {/* Verander de variant van de knop als deze geselecteerd wordt */}
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
                    <div className="text-center mt-4">
                        <Button
                            variant="primary"
                            onClick={handleFetchByDate}
                            disabled={!startDate || !endDate} // Schakel de knop uit als de datums niet zijn ingevuld
                        >
                            Zoek voertuigen op datum
                        </Button>
                    </div>
                </div>

                {/* Toon de laadindicator of foutmeldingen als dat nodig is */}
                {loading && <div className="text-center mt-3">Laden...</div>}
                {error && <div className="text-danger text-center mt-3">{error}</div>}

                {/* Toon een bericht als er geen resultaten zijn. */}
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
                                        <p>Prijs: ${50}</p>
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

