// Import statements
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import BoNavbar from '../components/BoNavbar';
import FoNavbar from '../components/FoNavbar';
import PartNavbar from "../components/PartNavbar.jsx";
import WbNavbar from '../components/WbNavbar';

const HuurVerzoek = () => {
    // States voor de rollen en formulierdata
    const [role, setRole] = useState('');
    const storedWagen = JSON.parse(sessionStorage.getItem('selectedWagen'));
    const [formData, setFormData] = useState({
        voertuigId: storedWagen?.voertuigId || '',
        startDatum: '',
        eindDatum: '',
        aardReis: '',
        bestemming: '',
        verwachtteKM: '',
        geselecteerdeAccessoire: [],
        geselecteerdeVerzekering: 0,
    });
    const [accessoires, setAccessoires] = useState([]);
    const [verzekeringen, setVerzekeringen] = useState([]);
    const [wagen, setWagen] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();
    // useEffect hook om de rollen en wageninfo op te halen
    useEffect(() => {
        const storedWagen = JSON.parse(sessionStorage.getItem('selectedWagen'));
        if (storedWagen) {
            setWagen(storedWagen);
        }
        // Haal de rol op uit de sessionStorage
        const fetchAccessoires = async () => {
            try {
                const response = await axios.get('https://localhost:7281/api/verhuurVerzoek/GetAllAccessoires');
                // Voeg een extra optie toe voor 'Geen accessoire'
                setAccessoires([{ id: 'none', naam: 'Geen accessoire' }, ...response.data]);
            } catch (error) {
                console.error('Fout bij het ophalen van accessoires:', error);
            }
        };
        // Haal de verzekeringen op uit de API
        const fetchVerzekeringen = async () => {
            try {
                const response = await axios.get('https://localhost:7281/api/verhuurVerzoek/GetAllVerzekeringen');
                // Voeg een extra optie toe voor 'Geen verzekering'
                setVerzekeringen(response.data);
            } catch (error) {
                console.error('Fout bij het ophalen van verzekeringen:', error);
            }
        };
        // Haal de rollen op uit de sessionStorage
        fetchAccessoires();
        fetchVerzekeringen();
    }, []);
    // Functie om de formulierdata bij te werken
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    // Functie om de checkboxen bij te werken
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        let updatedAccessories = [...formData.geselecteerdeAccessoire];  // Kopieer de huidige array
        // Voeg het accessoire toe als het aangevinkt is
        if (checked) {
            if (!updatedAccessories.includes(value)) {
                updatedAccessories.push(value);  // Voeg toe als het nog niet bestaat
            }
        } else {
            updatedAccessories = updatedAccessories.filter(accessoire => accessoire !== value); // Verwijder het geselecteerde accessoire
        }
        // Update de state met de nieuwe array
        setFormData({
            ...formData,
            geselecteerdeAccessoire: updatedAccessories
        });
    };
    // Functie om terug te gaan naar de vorige pagina
    const handleGoBack = () => {
        navigate(-1);
    };
    // Functie om het formulier te versturen
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Log de data die verstuurd wordt
        console.log('FormData die verstuurd wordt:', formData);
        const { startDatum, eindDatum, aardReis, bestemming, verwachtteKM, geselecteerdeVerzekering, geselecteerdeAccessoire } = formData;

        // Filter onnodige velden en zet ze om naar de juiste parameternaam voor de API
        const filteredFormData = {
            voertuigId: storedWagen?.voertuigId,  // Voeg voertuigId toe, als dat nodig is
            startDatum,
            eindDatum,
            aardReis,
            bestemming,
            verwachtteKM,
            accessoiresIds: geselecteerdeAccessoire.length > 0 ? geselecteerdeAccessoire : [],  // Gebruik 'accessoiresIds' i.p.v. 'geselecteerdeAccessoire'
            verzekeringId: geselecteerdeVerzekering,  // Gebruik 'verzekeringId' i.p.v. 'geselecteerdeVerzekering'
        };
        //  Haal de JWT-token op uit de sessionStorage
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }
        // Verstuur het formulier naar de backend
        try {
            const response = await axios.post(
                'https://localhost:7281/api/verhuurVerzoek/VerhuurVerzoekRequest',
                filteredFormData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Formulier succesvol ingediend:', response.data);
            setShowAlert(true);

            // Herleiding naar PendingVerzoek na het indienen van het formulier
            setTimeout(() => {
                // Navigeren naar de PendingVerzoek pagina
                navigate('/PendingVerzoek');  // Dit is de route voor je PendingVerzoek-pagina
            }, 3000);

        } catch (error) {
            console.error('Fout bij het indienen van het formulier:', error);
        }
    };
    // Als de wageninfo nog niet geladen is, toon dan een laad-icoon
    if (!wagen) {
        return <div>Loading wagen info...</div>;
    }
    // Functie om de navbar te renderen op basis van de rol
    const renderNavbar = () => {
        switch (role) {
            case 'backendWorker':
                return <BoNavbar />;
            case 'wagenparkBeheerder':
                return <WbNavbar />;
            case 'particuliereKlant':
            case 'bedrijfsKlant':
                return <PartNavbar />;
            case 'frontendWorker':
                return <FoNavbar />;
            default:
                return <PartNavbar />;
        }
    };

    return (
        <div className="achtergrond2">
            {renderNavbar()}
            <h1 className="pagina-titel text-center"><br />Uw Keuze:</h1>
            <Container fluid className="d-flex justify-content-center align-items-center huren-background">
                <Col md={6}>
                {/* Alert voor het succesvol indienen van het huurverzoek */}
                    {showAlert && (
                        <Alert variant="success" className="text-center mt-3">
                            Uw huurverzoek is succesvol ingediend! U zult over 3 seconden herleid worden.
                        </Alert>
                    )}
                    <Card className='huren-box p-4 mt-5'>
                        <Card.Img
                            variant="top"
                            src={`src/logos/${wagen.merk.toLowerCase()}.png`}
                            className="car-image" />
                        <Card.Body className="p-3">
                            <Card.Text className="text-center gekozen-auto mb-5 p-2">
                                U heeft de <strong> {wagen.merk} {wagen.type} </strong>gekozen!
                            </Card.Text>

                            <Card.Title className="mb-3 p-2"><strong>Uw persoonlijke informatie</strong></Card.Title>
                            <Form className="p-2" onSubmit={handleSubmit}>
                                <Form.Group controlId="formstartDatum" className="p-2">
                                    <Form.Label>📅 Vanaf:</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="startDatum"
                                        value={formData.startDatum}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEinddatum" className="p-2">
                                    <Form.Label>📅 Tot:</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="eindDatum"
                                        value={formData.eindDatum}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formAardVanRij" className="p-2">
                                    <Form.Label>🏖️ De aard van het reis</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="aardReis"
                                        value={formData.aardReis}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBestemming" className="p-2">
                                    <Form.Label>🌍 Uw verste bestemming</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="bestemming"
                                        value={formData.bestemming}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formKilometers" className="p-2">
                                    <Form.Label>📏 Verwachting aantal afgelegde kilometers</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="verwachtteKM"
                                        value={formData.verwachtteKM}
                                        onChange={handleChange}
                                        maxLength={5}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formVerzekering" className="p-2">
                                    <Form.Label>🔒 Kies een verzekering:</Form.Label>
                                    <Form.Control as="select" name="geselecteerdeVerzekering" value={formData.geselecteerdeVerzekering} onChange={handleChange}>
                                        <option value="0">Selecteer een verzekering</option>
                                        {verzekeringen.map((verzekering) => (
                                            <option key={verzekering.verzekeringId} value={verzekering.verzekeringId}>
                                                {verzekering.verzekeringNaam}
                                            </option>
                                        ))}
                                    </Form.Control>

                                </Form.Group>

                                <Form.Group controlId="formAccessoire" className="p-2">
                                    <Form.Label>🛠️ Kies een accessoire:</Form.Label>
                                    {accessoires.map((accessoire) => (
                                        <Form.Check
                                            key={accessoire.accessoiresId}
                                            type="checkbox"
                                            label={accessoire.naam}
                                            value={accessoire.accessoiresId}
                                            onChange={handleCheckboxChange}
                                            name="geselecteerdeAccessoire"
                                        />
                                    ))}
                                </Form.Group>

                                <div className="d-flex justify-content-center p-2">
                                    <Button className='knop' type="submit">👍 Huurverzoek afronden</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Container>
            <div className="d-flex justify-content-center my-4">
                <Button className="knop" onClick={handleGoBack}>← Terug</Button>
            </div>
        </div>
    );
};

export default HuurVerzoek;
