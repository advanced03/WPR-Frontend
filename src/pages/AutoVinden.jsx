import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ButtonGroup, Form } from 'react-bootstrap';
import axios from 'axios';
import '../style/huren.css';
import '../style/knop.css';
import BoNavbar from '../components/BoNavbar';
import FoNavbar from '../components/FoNavbar';
import PartNavbar from "../components/PartNavbar.jsx";
import WbNavbar from '../components/WbNavbar';

const AutoVinden = () => {
    // Usestates initializeren
    const [selectedType, setSelectedType] = useState('auto');
    const [searchTerm, setSearchTerm] = useState('');
    const [wagens, setWagens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [userRole, setUserRole] = useState(null); // Nieuw: state voor de gebruikersrol
    const navigate = useNavigate();

    // Functie om de data van de API op te halen
    useEffect(() => {
        // Haal voertuigen op
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

        // Haal gebruikersrol op
        const fetchUserRole = async () => {
            const token = sessionStorage.getItem('jwtToken');
            if (!token) return; // Controleer of JWT-token bestaat
            try {
                const response = await axios.get('https://localhost:7281/api/Account/getUserData', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserRole(response.data.role);
            } catch (error) {
                console.error('Fout bij het ophalen van de gebruikersrol:', error);
            }
        };

        fetchWagens();
        fetchUserRole();
    }, []);

    const handleFetchByDate = async () => {
        if (!startDate || !endDate) {
            setError('Vul zowel een begin- als einddatum in.');
            return;
        }
    
        setLoading(true);
        try {
            const response = await axios.get('https://localhost:7281/api/voertuigen/GetVoertuigByDate', {
                params: { startDate, endDate }
            });
            setWagens(response.data);
            setError(null);
        } catch (error) {
            setError('Er is een fout opgetreden bij het ophalen van voertuigen op basis van de datums.');
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (type) => setSelectedType(type);

    const handleRentClick = (wagen) => {
        sessionStorage.setItem('selectedWagen', JSON.stringify(wagen));
        const storedWagen = JSON.parse(sessionStorage.getItem('selectedWagen'));
        console.log(storedWagen);
        navigate('/Huurverzoek');
    };

    const filteredWagens = wagens.filter(wagen =>
        wagen.soort === selectedType &&
        (wagen.merk.toLowerCase().includes(searchTerm.toLowerCase()) ||
            wagen.type.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const renderNavbar = () => {
        switch (userRole) {
            case 'backendWorker':
                return <BoNavbar />;
            case 'wagenparkBeheerder':
                return <WbNavbar />;
            case 'particuliereKlant':
                return <PartNavbar />;
            case 'frontendWorker':
                return <FoNavbar />;
            default:
                return <PartNavbar />;
        }
    };

    const handleStartDateChange = (e) => setStartDate(e.target.value);
    const handleEndDateChange = (e) => setEndDate(e.target.value);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="achtergrond2">
            {renderNavbar()} {/* Dynamisch de juiste navbar renderen */}
            <Container fluid className="p-2 my-4">
                <h1 className="pagina-titel text-center my-4">Kies een Voertuig om te Huren</h1>
                <div className="huren-box text-center mt-5 p-5">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Zoek voertuigen..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
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
                            disabled={userRole === 'bedrijfsKlant'} // Schakel de caravan-knop uit voor bedrijfsKlant
                        >
                            Caravan ⛺
                        </Button>
                        <Button
                            variant={selectedType === 'camper' ? 'secondary' : 'outline-light'}
                            onClick={() => handleSelect('camper')}
                            disabled={userRole === 'bedrijfsKlant'} // Schakel de camper-knop uit voor bedrijfsKlant
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
                            className="knop"
                            onClick={handleFetchByDate}
                            disabled={!startDate || !endDate || startDate.trim() === '' || endDate.trim() === ''}
                        >
                            Zoek voertuigen op datum
                        </Button>
                    </div>
                </div>

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
