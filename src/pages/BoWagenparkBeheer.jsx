// Import statements
import React, { useState, useEffect } from 'react';
import { Alert, Container, Table, Button, FormControl, InputGroup, Modal, Form } from 'react-bootstrap';
import BoNavbar from '../components/BoNavbar';
import axios from 'axios';

// Backoffice Wagenparkbeheer pagina
const BOWagenparkBeheer = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentVehicle, setCurrentVehicle] = useState(null);
    const [toonModal, setModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteVehicleId, setDeleteVehicleId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    // Formulier voor toevoegen/wijzigen van voertuigen
    const [form, setForm] = useState({
        merk: '',
        type: '',
        kleur: '',
        aanschafJaar: '',
        kenteken: '',
        soort: '',
    });
    // Fetch wagens
    useEffect(() => {
        const fetchWagens = async () => {
            try {
                const response = await axios.get(
                    'https://localhost:7281/api/voertuigen/GetAllVoertuigDataEnStatus'
                );
                console.log('API Response:', response.data);
                setVehicles(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching voertuigen:', error); // Log error
                setError('Er is een fout opgetreden bij het ophalen van de voertuigen.'); // Set error message
                setLoading(false);
            }
        };
        // Fetch wagens methode aanroepen
        fetchWagens();
    }, []);

    // Methode om input velden up te daten.
    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    //Blokeer voertuigen.
    const handleBlockVehicle = async (vehicleId) => {
        try {
            //Opmerking is verplicht
            const opmerking = prompt('Geef een reden voor het blokkeren van dit voertuig:');
            if (!opmerking) {
                alert('Blokkeren geannuleerd. Opmerking is verplicht.');
                return;
            }
            //API aanroepen om voertuig te blokkeren
            await axios.put('https://localhost:7281/api/BackOfficeMedewerker/BlokkeerdVoertuig', null, {
                params: { voertuigId: vehicleId, opmerking },
            });
            // Pagina herladen
            window.location.reload();
            // Voertuig status updaten
            setVehicles((prevVehicles) =>
                prevVehicles.map((v) =>
                    v.voertuigId === vehicleId
                        ? { ...v, status: 'Niet Beschikbaar' }
                        : v
                )
            );
            // Foutmelding tonen
        } catch (error) {
            console.error('Error bij het blokkeren van voertuig:', error);
            setError('Er is een fout opgetreden bij het blokkeren van het voertuig.');
        }
    };


    //Methode om voertuigen te deblokkeren.
    const handleUnblockVehicle = async (vehicleId) => {
        try {
            await axios.put('https://localhost:7281/api/BackOfficeMedewerker/DeblokkeerVoertuig', null, {
                params: { voertuigId: vehicleId },
            });
            window.location.reload();

            // Voertuig status updaten
            setVehicles((prevVehicles) =>
                prevVehicles.map((v) =>
                    v.voertuigId === vehicleId
                        ? { ...v, status: 'Beschikbaar' }
                        : v
                )
            );
            // Foutmelding tonen
        } catch (error) {
            console.error('Error bij het deblokkeren van voertuig:', error);
            setError('Er is een fout opgetreden bij het deblokkeren van het voertuig.');
        }
    };

    //Methode om voertuigen toe te voegen
    const handleAddVehicle = async () => {
        console.log('Voertuig toe te voegen:', form);
        // newVehicle object aanmaken
        const newVehicle = {
            merk: form.merk,
            type: form.type,
            kleur: form.kleur,
            aanschafJaar: parseInt(form.aanschafJaar),
            kenteken: form.kenteken,
            soort: form.soort,
        };
        // Validatie van input velden, alles moet ingevuld worden.
        if (!newVehicle.merk || !newVehicle.type || !newVehicle.kleur || !newVehicle.kenteken || !newVehicle.soort || isNaN(newVehicle.aanschafJaar)) {
            setError('Alle velden moeten ingevuld zijn met geldige waarden.');
            return;
        }

        try {
            // Backend aanroepen om voertuig toe te voegen
            const response = await axios.post(
                'https://localhost:7281/api/BackOfficeMedewerker/AddVoertuig',
                newVehicle
            );

            console.log('Added Vehicle Response:', response.data);

            setVehicles(prevVehicles => [...prevVehicles, response.data]);
            // Formulier resetten
            setForm({
                merk: '',
                type: '',
                kleur: '',
                aanschafJaar: '',
                kenteken: '',
                soort: '',
            });
            // Modal sluiten
            setModal(false);
            setSuccessMessage('Voertuig succesvol toegevoegd!');
            setShowSuccess(true);
            // Pagina herladen
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            // Foutmelding tonen
        } catch (error) {
            console.error('Error adding voertuig:', error);
            setError('Er is een fout opgetreden bij het toevoegen van het voertuig.');
        }
    };

    //Methode om wagens up te daten
    const handleUpdateVehicle = async () => {
        try {
            const updatedVehicle = { ...form };
            await axios.put(
                `https://localhost:7281/api/BackOfficeMedewerker/WijzigVoertuig`,
                updatedVehicle
            );
            window.location.reload();
            const updatedVehicles = vehicles.map((v, idx) =>
                idx === currentVehicle ? updatedVehicle : v
            );
            // Voertuigen updaten
            setVehicles(updatedVehicles);
            // Formulier resetten
            setForm({
                merk: '',
                type: '',
                kleur: '',
                aanschafJaar: '',
                kenteken: '',
                soort: '',
            });
            setCurrentVehicle(null);
            setModal(false);
            //  Succesmelding tonen
            setSuccessMessage('Voertuig succesvol bijgewerkt!');
            setShowSuccess(true);
        } catch (error) {
            console.error('Error updating voertuig:', error);
            setError('Er is een fout opgetreden bij het bijwerken van het voertuig.');
        }
    };

    //Methode om wagens te verwijderen
    const handleDeleteVehicle = async (vehicleId) => {
        try {
            if (!vehicleId) {
                console.error('Geen voertuig ID gevonden');
                setError('Voertuig ID ontbreekt.');
                return;
            }

            const response = await axios({
                method: 'delete',
                url: 'https://localhost:7281/api/BackOfficeMedewerker/VerwijderVoertuig',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: { id: vehicleId },
            });
            //  Succesmelding tonen
            if (response.status === 200 || response.status === 204) {
                setVehicles(vehicles.filter((vehicle) => vehicle.voertuigId !== vehicleId));
                setShowDeleteModal(false);

                setSuccessMessage('Voertuig succesvol verwijderd!');
                setShowSuccess(true);
            } else {
                throw new Error(`Onverwachte statuscode: ${response.status}`);
            }
        } catch (error) {
            console.error('Fout bij het verwijderen van voertuig:', error);
            setError('Er is een fout opgetreden bij het verwijderen van het voertuig.');
        }
    };

    //Zoekbalk code
    const filteredVehicles = vehicles.filter((vehicle) => {
        // Zoekquery (merk, type, kleur, kenteken, aanschafjaar, soort)
        const matchesSearch =
            (vehicle.merk || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (vehicle.type || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (vehicle.kleur || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (vehicle.kenteken || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (vehicle.aanschafJaar || '').toString().includes(searchQuery) ||
            (vehicle.soort || '').toString().includes(searchQuery);
        return matchesSearch;
    });

    // Laad scherm tonen
    if (loading) return <div>Gegevens worden geladen...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="achtergrond2">
            <BoNavbar />
            <Container>
                <h1 className="pagina-titel text-center my-4">Wagenparkbeheer</h1>
                {/** Succesmelding tonen */}
                {showSuccess && (
                    <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                        {successMessage}
                    </Alert>
                )}
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
                        {/* Voertuigen tonen */}
                        {filteredVehicles.map((vehicle, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{vehicle.merk || 'N/A'}</td>
                                <td>{vehicle.type || 'N/A'}</td>
                                <td>{vehicle.kleur || 'N/A'}</td>
                                <td>{vehicle.aanschafJaar || 'N/A'}</td>
                                <td>{vehicle.kenteken || 'N/A'}</td>
                                <td>{vehicle.soort || 'N/A'}</td>
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
                                            setDeleteVehicleId(vehicle.voertuigId);
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        Verwijderen
                                    </Button>
                                    {/* Voertuig blokkeren/deblokkeren */}
                                    {vehicle.voertuigData.status.toLowerCase() === 'geblokkeerd' ? (
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

                {/* Modal voor toevoegen/wijzigen van voertuigen */}
                <Modal show={toonModal} onHide={() => setModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{currentVehicle !== null ? 'Voertuig Wijzigen' : 'Voertuig Toevoegen'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Merk</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="merk"
                                    value={form.merk}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="type"
                                    value={form.type}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Kleur</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="kleur"
                                    value={form.kleur}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Aanschafjaar</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="aanschafJaar"
                                    value={form.aanschafJaar}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Kenteken</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="kenteken"
                                    value={form.kenteken}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Soort</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="soort"
                                    value={form.soort}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* Voertuig toevoegen/wijzigen knop */}
                        <Button
                            variant="primary    "
                            onClick={currentVehicle !== null ? handleUpdateVehicle : handleAddVehicle}
                        >
                            {currentVehicle !== null ? 'Wijzigen' : 'Toevoegen'}
                        </Button>
                        <Button variant="secondary" onClick={() => setModal(false)}>
                            Annuleren
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal voor verwijderen van voertuig */}
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Bevestig Verwijderen</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Weet je zeker dat je dit voertuig wilt verwijderen?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => handleDeleteVehicle(deleteVehicleId)}>
                            Verwijderen
                        </Button>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                            Annuleren
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
};

export default BOWagenparkBeheer;
