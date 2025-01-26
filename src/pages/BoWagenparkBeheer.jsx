import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Dropdown, DropdownButton, InputGroup, FormControl } from 'react-bootstrap';
import BoNavbar from "../components/BoNavbar";
import axios from 'axios';

const BOWagenparkBeheer = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true); // Nieuwe loading state
    const [error, setError] = useState(null); // Nieuwe error state
    const [form, setForm] = useState({
        merk: '',
        type: '',
        kleur: '',
        bouwjaar: '',
        kenteken: '',
        status: 'Beschikbaar',
    });

    const [currentVehicle, setCurrentVehicle] = useState(null);
    const [toonModal, setModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [statusFilter, setStatusFilter] = useState('Alle');
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch voertuigen van backend
    useEffect(() => {
        const fetchWagens = async () => {
            try {
                const response = await axios.get('https://localhost:7281/api/voertuigen/AllVoertuigen');
                console.log('Response Data:', response.data);
                setVehicles(response.data); // Zet de voertuigen in de state
                setLoading(false);
            } catch (error) {
                console.error('Error fetching voertuigen:', error);
                setError('Er is een fout opgetreden bij het ophalen van de voertuigen.');
                setLoading(false);
            }
        };

        fetchWagens();
    }, []);

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAddOrUpdateVehicle = async () => {
        try {
            if (currentVehicle !== null) {
                // Update een bestaand voertuig
                const updatedVehicle = { ...form };
                await axios.put(`https://localhost:7281/api/voertuigen/${vehicles[currentVehicle].id}`, updatedVehicle);
                const updatedVehicles = vehicles.map((v, idx) =>
                    idx === currentVehicle ? updatedVehicle : v
                );
                setVehicles(updatedVehicles);
            } else {
                // Voeg een nieuw voertuig toe
                const newVehicle = { ...form };
                const response = await axios.post('https://localhost:7281/api/voertuigen', newVehicle);
                setVehicles([...vehicles, response.data]);
            }
            setForm({ merk: '', type: '', kleur: '', bouwjaar: '', kenteken: '', status: 'Beschikbaar' });
            setCurrentVehicle(null);
            setModal(false);
        } catch (error) {
            console.error('Error saving voertuig:', error);
            setError('Er is een fout opgetreden bij het opslaan van het voertuig.');
        }
    };

    const handleDeleteVehicle = async () => {
        try {
            const vehicleId = vehicles[deleteIndex].id;
            await axios.delete(`https://localhost:7281/api/voertuigen/${vehicleId}`);
            setVehicles(vehicles.filter((_, idx) => idx !== deleteIndex));
            setDeleteIndex(null);
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting voertuig:', error);
            setError('Er is een fout opgetreden bij het verwijderen van het voertuig.');
        }
    };

    const filteredVehicles = vehicles.filter((vehicle) => {
        const matchesStatus =
            statusFilter === 'Alle' ||
            (statusFilter === 'Actief' && vehicle.status === 'Beschikbaar') ||
            (statusFilter === 'Geblokkeerd' && vehicle.status === 'Niet Beschikbaar');
        const matchesSearch =
            vehicle.merk.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.kleur.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.kenteken.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesStatus && matchesSearch;
    });

    if (loading) return <div>Gegevens worden geladen...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="achtergrond2">
            <BoNavbar />
            <Container>
                <h1 className="pagina-titel text-center my-4">Wagenparkbeheer</h1>
                {/* Filters en zoekbalk */}
                <div className="d-flex justify-content-between mb-3">
                    <InputGroup className="w-50">
                        <FormControl
                            placeholder="Zoek voertuigen..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </InputGroup>
                    <DropdownButton
                        variant="secondary"
                        title={statusFilter === 'Alle' ? 'Alle Voertuigen' : statusFilter}
                        onSelect={(status) => setStatusFilter(status)}
                    >
                        <Dropdown.Item eventKey="Alle">Alle Voertuigen</Dropdown.Item>
                        <Dropdown.Item eventKey="Actief">Alleen Actief</Dropdown.Item>
                        <Dropdown.Item eventKey="Geblokkeerd">Alleen Geblokkeerd</Dropdown.Item>
                    </DropdownButton>
                    <Button className="mb-3 knop" onClick={() => setModal(true)}>
                        Voertuig Toevoegen
                    </Button>
                </div>
                {/* Tabel met voertuigen */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Merk</th>
                            <th>Type</th>
                            <th>Kleur</th>
                            <th>Bouwjaar</th>
                            <th>Kenteken</th>
                            <th>Status</th>
                            <th>Acties</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVehicles.map((vehicle, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{vehicle.merk}</td>
                                <td>{vehicle.type}</td>
                                <td>{vehicle.kleur}</td>
                                <td>{vehicle.bouwjaar}</td>
                                <td>{vehicle.kenteken}</td>
                                <td>{vehicle.status}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        onClick={() => {
                                            setCurrentVehicle(index);
                                            setForm(vehicle);
                                            setModal(true);
                                        }}
                                    >
                                        Wijzigen
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => {
                                            setDeleteIndex(index);
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        Verwijderen
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

export default BOWagenparkBeheer;
