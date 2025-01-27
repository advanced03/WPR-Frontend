import React, { useState, useEffect } from 'react';
import { Container, Table, InputGroup, FormControl, Button } from 'react-bootstrap';
import BoNavbar from "../components/BoNavbar";
import axios from 'axios';

const BoSchadeRegister = () => {
    const [schadeMeldingen, setSchadeMeldingen] = useState([]);
    const [loading, setLoading] = useState(true); // Nieuwe loading state
    const [error, setError] = useState(null); // Nieuwe error state
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch schade meldingen van backend
    useEffect(() => {
        const fetchSchadeMeldingen = async () => {
            try {
                const response = await axios.get('https://localhost:7281/api/BackOfficeMedewerker/GetAllSchadeMeldingen');
                console.log('Schade Meldingen:', response.data);
                setSchadeMeldingen(response.data); // Zet de schade meldingen in de state
                setLoading(false);
            } catch (error) {
                console.error('Error fetching schade meldingen:', error);
                setError('Er is een fout opgetreden bij het ophalen van de schade meldingen.');
                setLoading(false);
            }
        };

        fetchSchadeMeldingen();
    }, []);

    const filteredSchadeMeldingen = schadeMeldingen.filter((melding) => {
        return (
            melding.schade.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (melding.reparatieOpmerking && melding.reparatieOpmerking.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    });

    if (loading) return <div>Gegevens worden geladen...</div>;
    if (error) return <div>{error}</div>;

    const handleBehandelSchade = (voertuigId) => {
        // Voeg hier de logica toe voor het behandelen van de schade
        alert(`Schade voor voertuig ID ${voertuigId} wordt behandeld.`);
    };

    return (
        <div className="achtergrond2">
            <BoNavbar />
            <Container>
                <h1 className="pagina-titel text-center my-4">Schade Register</h1>
                {/* Zoekbalk */}
                <div className="d-flex justify-content-between mb-3">
                    <InputGroup className="w-50">
                        <FormControl
                            placeholder="Zoek schade meldingen..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </InputGroup>
                </div>
                {/* Tabel met schade meldingen */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Voertuig ID</th>
                            <th>Schade</th>
                            <th>Schade Datum</th>
                            <th>Foto</th>
                            <th>Behandel Schade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSchadeMeldingen.map((melding, index) => (
                            <tr key={index}>
                                <td>{melding.voertuigId}</td>
                                <td>{melding.schade}</td>
                                <td>{new Date(melding.schadeDatum).toLocaleString()}</td>
                                <td>
                                    {melding.foto ? (
                                        <img
                                            src={melding.foto}
                                            alt="Schade foto"
                                            style={{ width: '100px', height: 'auto', cursor: 'pointer' }}
                                            onClick={() => window.open(melding.foto, '_blank')}
                                        />
                                    ) : (
                                        'Geen foto'
                                    )}
                                </td>
                                <td>
                                    <Button
                                        className="knop"
                                        onClick={() => handleBehandelSchade(melding.voertuigId)}
                                    >
                                        Behandel Schade
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default BoSchadeRegister;
