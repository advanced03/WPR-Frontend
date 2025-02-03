// Import statements
import React, { useState, useEffect } from 'react';
import { Alert, Container, Table, Button, FormControl, InputGroup, Modal, Form } from 'react-bootstrap';
import BoNavbar from '../components/BoNavbar';
import axios from 'axios';

const BOWagenparkBeheer = () => {
    //Usestates initialiseren voor de functies en methoden bineen de pagina.
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentVehicle, setCurrentVehicle] = useState(null);
    const [toonModal, setModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [form, setForm] = useState({
        merk: '',
        type: '',
        kleur: '',
        aanschafJaar: '',
        kenteken: '',
    });

    //Methoden om alle voertuigen op te halen.
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

    //Methode om voertuigen te kunnen blokkereno.
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

        //Deblokkeer methode
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

    //Methode om voertuigen toe te voegen.
    const handleAddVehicle = async () => {
        console.log('Voertuig toe te voegen:', form);
        // Zorg ervoor dat 'aanschafJaar' als getal wordt doorgestuurd
        const newVehicle = {
            merk: form.merk,
            kenteken: form.kenteken,
            kleur: form.kleur,
            type: form.type,
            aanschafJaar: parseInt(form.aanschafJaar), // Zorg ervoor dat dit een getal is
            soort: form.soort,
        };

        // Controleer of alle velden zijn ingevuld
        if (!newVehicle.merk || !newVehicle.kenteken || !newVehicle.kleur || !newVehicle.type || !newVehicle.soort || isNaN(newVehicle.aanschafJaar)) {
            setError('Alle velden moeten ingevuld zijn met geldige waarden.');
            return;
        }

        try {
            // Voertuig toevoegen aan de server
            const response = await axios.post(
                'https://localhost:7281/api/BackOfficeMedewerker/AddVoertuig',
                newVehicle
            );

            // Voeg het nieuwe voertuig toe aan de huidige lijst zonder de lijst opnieuw op te halen
            setVehicles(prevVehicles => [...prevVehicles, response.data]);

            // Reset het formulier na toevoeging
            setForm({
                merk: '',
                type: '',
                kleur: '',
                aanschafJaar: '',
                kenteken: '',
                soort: '',
            });

            // Sluit de modal
            setModal(false);
        } catch (error) {
            console.error('Error adding voertuig:', error);
            setError('Er is een fout opgetreden bij het toevoegen van het voertuig.');
        }
    };

    //Methode om de informatie van de voertuigen bij te werken.
    const handleUpdateVehicle = async () => {
        try {
            const updatedVehicle = { ...form };
            await axios.put(
                `https://localhost:7281/api/BackOfficeMedewerker/WijzigVoertuig`,
                updatedVehicle
            );
            const updatedVehicles = vehicles.map((v, idx) =>
                idx === currentVehicle ? updatedVehicle : v
            );
            setVehicles(updatedVehicles);
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

            setSuccessMessage('Voertuig succesvol bijgewerkt!');
            setShowSuccess(true);
        } catch (error) {
            console.error('Error updating voertuig:', error);
            setError('Er is een fout opgetreden bij het bijwerken van het voertuig.');
        }
    };

    //Als er geen id is gevonden geef een error.
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

    //Zoekbalk code, je kunt filteren op merk, type, kleur, kenteken. aanschafjaar en soort.
    const filteredVehicles = vehicles.filter((vehicle) => {
        const matchesSearch =
            vehicle.merk.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.kleur.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.kenteken.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.aanschafJaar.toString().includes(searchQuery) ||
            vehicle.soort.toString().includes(searchQuery);

        return matchesSearch;
    });

    //Simpele tekst om te laten zien als het nog aan het laden is.
    if (loading) return <div>Gegevens worden geladen...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="achtergrond2">
            <BoNavbar />
            <Container>
                <h1 className="pagina-titel text-center my-4">Wagenparkbeheer</h1>
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

        {/*Layout van de modal, die getoond wordt als je een actie uitvoert*/}
            </Container>
            <Modal show={toonModal} onHide={() => setModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentVehicle !== null ? 'Wijzig Voertuig' : 'Voertuig Toevoegen'}</Modal.Title>
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
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                type="text"
                                name="type"
                                value={form.type}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Kleur</Form.Label>
                            <Form.Control
                                type="text"
                                name="kleur"
                                value={form.kleur}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Aanschafjaar</Form.Label>
                            <Form.Control
                                type="number"
                                name="aanschafJaar"
                                value={form.aanschafJaar}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Kenteken</Form.Label>
                            <Form.Control
                                type="text"
                                name="kenteken"
                                value={form.kenteken}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>type</Form.Label>
                            <Form.Control
                                type="text"
                                name="soort"
                                value={form.soort}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="success"
                        onClick={currentVehicle !== null ? handleUpdateVehicle : handleAddVehicle}
                    >
                        {currentVehicle !== null ? 'Wijzigen' : 'Toevoegen'}
                    </Button>
                    <Button variant="danger" onClick={() => setModal(false)}>
                        Annuleren
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for Delete Vehicle */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Bevestig Verwijderen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Weet je zeker dat je dit voertuig wilt verwijderen?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDeleteVehicle}>
                        Verwijderen
                    </Button>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Annuleren
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BOWagenparkBeheer;
