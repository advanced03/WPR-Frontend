import React, { useState, useEffect } from 'react';
import { Container, Table, InputGroup, FormControl, Button, Modal } from 'react-bootstrap';
import BoNavbar from "../components/BoNavbar";
import axios from 'axios';

const BoSchadeRegister = () => {
    const [schadeMeldingen, setSchadeMeldingen] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedMelding, setSelectedMelding] = useState(null);
    const [reparatieOpmerking, setReparatieOpmerking] = useState('');

    useEffect(() => {
        const fetchSchadeMeldingen = async () => {
            try {
                const response = await axios.get('https://localhost:7281/api/BackOfficeMedewerker/GetAllSchadeMeldingen');
                setSchadeMeldingen(response.data); // Vul de lijst met data
            } catch (error) {
                console.error('Error fetching schade meldingen:', error);

                if (error.response && error.response.status === 404) {
                    setSchadeMeldingen([]); // Voorkomt dat de pagina wit blijft bij een 404
                } else {
                    setError('Er is een fout opgetreden bij het ophalen van de schade meldingen.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSchadeMeldingen();
    }, []);


    // Modal openen en bijhouden
    const handleOpenModal = (melding) => {
        setSelectedMelding(melding);
        setReparatieOpmerking('');
        setShowModal(true);
    };
// Modal sluiten en bijhouden
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedMelding(null);
        setReparatieOpmerking('');
    };
//Behandel schade methode
    const handleBehandelSchade = async () => {
        if (!selectedMelding) return;

        try {
            await axios.put('https://localhost:7281/api/BackOfficeMedewerker/BehandelSchadeMelding', {
                schadeFormulierId: selectedMelding.schadeFormulierID,
                reparatieOpmerking: reparatieOpmerking || "Geen opmerkingen toegevoegd."
            });

            alert('Schade is succesvol behandeld!');
            setShowModal(false);

            // Verwijder de behandelde schade uit de lijst
            const updatedSchadeMeldingen = schadeMeldingen.filter(
                (melding) => melding.schadeFormulierID !== selectedMelding.schadeFormulierID
            );
            setSchadeMeldingen(updatedSchadeMeldingen);

        } catch (error) {
            console.error('Error bij het behandelen van schade:', error);
            alert(`Er is een fout opgetreden: ${error.response?.statusText || error.message}`);
        }
    };
// Methode om schademeldingen te filteren.
    const filteredSchadeMeldingen = schadeMeldingen.filter((melding) => {
        return (
            melding.schade.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (melding.reparatieOpmerking && melding.reparatieOpmerking.toLowerCase().includes(searchQuery.toLowerCase())) ||
            String(melding.voertuigId).toLowerCase().includes(searchQuery.toLowerCase())
        );
    });
    
    

    if (loading) return <div>Gegevens worden geladen...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="achtergrond2">
            <BoNavbar />
            <Container>
                <h1 className="pagina-titel text-center my-5">Schade Register</h1>
                <div className="zoekbalk mt-5 mb-5">
                    <InputGroup>
                        <FormControl
                            placeholder="Zoek schade meldingen..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </InputGroup>
                </div>

                {schadeMeldingen.length === 0 ? (
                    <div className="text-center my-4">
                        <h4>Geen schade meldingen gevonden.</h4>
                    </div>
                ) : (
                    <Table className="schade-tabel" striped bordered hover>
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
                                                className="schade-foto"
                                                src={melding.foto}
                                                alt="Schade foto"
                                                onClick={() => window.open(melding.foto, '_blank')}
                                            />
                                        ) : (
                                            'Geen foto'
                                        )}
                                    </td>
                                    <td>
                                        <Button
                                            className="knop"
                                            onClick={() => handleOpenModal(melding)}
                                        >
                                            Behandel Schade
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Container>

            {/* Modalcode layout */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Behandel Schade</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedMelding && (
                        <div>
                            <p><strong>Voertuig ID:</strong> {selectedMelding.voertuigId}</p>
                            <p><strong>Schade:</strong> {selectedMelding.schade}</p>
                            <InputGroup>
                                <FormControl
                                    as="textarea"
                                    placeholder="Voeg een reparatie opmerking toe..."
                                    value={reparatieOpmerking}
                                    onChange={(e) => setReparatieOpmerking(e.target.value)}
                                />
                            </InputGroup>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModal}>
                        Annuleren
                    </Button>
                    <Button variant="success" onClick={handleBehandelSchade}>
                        Behandel Schade
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BoSchadeRegister;
