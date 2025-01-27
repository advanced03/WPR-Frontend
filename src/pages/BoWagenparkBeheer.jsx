import React, { useState, useEffect } from 'react';
import {
    Container,
    Table,
    Button,
    Modal,
    FormControl,
    InputGroup,
    DropdownButton,
    Dropdown,
    Form,
} from 'react-bootstrap';
import BoNavbar from '../components/BoNavbar';
import axios from 'axios';

const BOWagenparkBeheer = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        merk: '',
        type: '',
        kleur: '',
        aanschafJaar: '',
        kenteken: '',
    });

    const [currentVehicle, setCurrentVehicle] = useState(null);
    const [toonModal, setModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchWagens = async () => {
            try {
                const response = await axios.get(
                    'https://localhost:7281/api/voertuigen/AllVoertuigen'
                );
                setVehicles(response.data);
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

    const handleBlockVehicle = async (vehicleId) => {
        try {
            const opmerking = prompt('Geef een reden voor het blokkeren van dit voertuig:');
            if (!opmerking) {
                alert('Blokkeren geannuleerd. Opmerking is verplicht.');
                return;
            }

            await axios.put('https://localhost:7281/api/BackOfficeMedewerker/BlokkeerdVoertuig', null, {
                params: { voertuigId: vehicleId, opmerking },
            });

            setVehicles((prevVehicles) =>
                prevVehicles.map((v) =>
                    v.voertuigId === vehicleId
                        ? { ...v, status: 'Niet Beschikbaar' }
                        : v
                )
            );
        } catch (error) {
            console.error('Error bij het blokkeren van voertuig:', error);
            setError('Er is een fout opgetreden bij het blokkeren van het voertuig.');
        }
    };

    const handleUnblockVehicle = async (vehicleId) => {
        try {
            await axios.put('https://localhost:7281/api/BackOfficeMedewerker/DeblokkeerVoertuig', null, {
                params: { voertuigId: vehicleId },
            });

            setVehicles((prevVehicles) =>
                prevVehicles.map((v) =>
                    v.voertuigId === vehicleId
                        ? { ...v, status: 'Beschikbaar' }
                        : v
                )
            );
        } catch (error) {
            console.error('Error bij het deblokkeren van voertuig:', error);
            setError('Er is een fout opgetreden bij het deblokkeren van het voertuig.');
        }
    };

    const handleDeleteVehicle = async () => {
        try {
            const vehicleId = vehicles[deleteIndex]?.voertuigId;

            if (!vehicleId) {
                console.error('Geen voertuig ID gevonden');
                setError('Voertuig ID ontbreekt.');
                return;
            }

            const payload = {
                id: vehicleId,
            };

            const response = await axios({
                method: 'delete',
                url: 'https://localhost:7281/api/BackOfficeMedewerker/VerwijderVoertuig',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: payload,
            });

            if (response.status === 200 || response.status === 204) {
                setVehicles(vehicles.filter((_, idx) => idx !== deleteIndex));
                setDeleteIndex(null);
                setShowDeleteModal(false);
            } else {
                throw new Error(`Onverwachte statuscode: ${response.status}`);
            }
        } catch (error) {
            console.error('Fout bij het verwijderen van voertuig:', error);
            setError('Er is een fout opgetreden bij het verwijderen van het voertuig.');
        }
    };

    const filteredVehicles = vehicles.filter((vehicle) => {
        const matchesSearch =
            vehicle.merk.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.kleur.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.kenteken.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesSearch;
    });

    if (loading) return <div>Gegevens worden geladen...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="achtergrond2">
            <BoNavbar />
            <Container>
                <h1 className="pagina-titel text-center my-4">Wagenparkbeheer</h1>
                <div className="d-flex justify-content-between mb-3">
                    <InputGroup className="w-50">
                        <FormControl
                            placeholder="Zoek voertuigen..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </InputGroup>
                    <Button className="mb-3 knop" onClick={() => setModal(true)}>
                        Voertuig Toevoegen
                    </Button>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Merk</th>
                            <th>Type</th>
                            <th>Kleur</th>
                            <th>Bouwjaar</th>
                            <th>Kenteken</th>
                            <th>Type</th>
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
                                <td>{vehicle.aanschafJaar}</td>
                                <td>{vehicle.kenteken}</td>
                                <td>{vehicle.soort}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        className="mx-1"
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
                                        className="mx-1"
                                        size="sm"
                                        onClick={() => {
                                            setDeleteIndex(index);
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        Verwijderen
                                    </Button>
                                    {vehicle.status === 'Niet Beschikbaar' ? (
                                        <Button
                                            variant="success"
                                            className="mx-1"
                                            size="sm"
                                            onClick={() => handleUnblockVehicle(vehicle.voertuigId)}
                                        >
                                            Deblokkeren
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="secondary"
                                            className="mx-1"
                                            size="sm"
                                            onClick={() => handleBlockVehicle(vehicle.voertuigId)}
                                        >
                                            Blokkeren
                                        </Button>
                                    )}
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
