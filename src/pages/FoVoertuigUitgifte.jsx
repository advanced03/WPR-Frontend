import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Modal, Form, FormControl, Alert } from 'react-bootstrap';
import FoNavbar from "../components/FoNavbar";

const FoVoertuigUitgifte = () => {
    const [autos, zetAutos] = useState([]);
    const [zoekTerm, zetZoekTerm] = useState("");
    const [geselecteerdeAuto, zetGeselecteerdeAuto] = useState(null);
    const [toonModal, setModal] = useState(false);
    const [opmerking, zetOpmerking] = useState("");
    const [melding, zetMelding] = useState(null);

    const haalReserveringenOp = async () => {
        try {
            const respons = await axios.get("https://localhost:7281/api/Reserveringen/GetAllReserveringen");
            zetAutos(respons.data);
        } catch (error) {
            console.error("Kon de reserveringen niet ophalen. Controleer de API.", error);
        }
    };

    useEffect(() => {
        haalReserveringenOp();
    }, []);

    const toonMelding = (boodschap, variant = "success") => {
        zetMelding({ boodschap, variant });
        setTimeout(() => zetMelding(null), 3000);
    };

    const registreerUitgifte = (auto) => {
        zetGeselecteerdeAuto(auto);
        setModal(true);
    };

    const opslaanUitgifte = async () => {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }
        try {
            const id = geselecteerdeAuto.reserveringId;
            await axios.put(
                'https://localhost:7281/api/FrontOfficeMedewerker/GeefVoertuigUit',
                { id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            haalReserveringenOp();
            toonMelding("Uitgifte succesvol geregistreerd!", "success");
        } catch (error) {
            console.error("Fout bij het registreren van de uitgifte:", error);
            toonMelding("Fout bij registreren van de uitgifte!", "danger");
        } finally {
            setModal(false);
            zetGeselecteerdeAuto(null);
            zetOpmerking("");
        }
    };

    const verwijderUitgifte = async (reserveringId) => {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }
        try {
            await axios.delete(
                `https://localhost:7281/api/Reserveringen/VerwijderReservering/${reserveringId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            haalReserveringenOp();
            toonMelding("Uitgifte succesvol verwijderd!", "success");
        } catch (error) {
            console.error("Fout bij het verwijderen van de uitgifte:", error);
            toonMelding("Fout bij verwijderen van de uitgifte!", "danger");
        }
    };

    // Filter out "Uitgegeven" vehicles
    const gefilterdeAutos = autos.filter((auto) => auto.status !== 'Uitgegeven');

    return (
        <div className='achtergrond2'>
            <FoNavbar />
            <Container fluid>
                <h1 className="pagina-titel text-center my-5">Voertuig uitgifte registreren</h1>

                {melding && <Alert variant={melding.variant} className="text-center">{melding.boodschap}</Alert>}

                <FormControl
                    type="text"
                    placeholder="Zoek op naam, bestemming of andere velden..."
                    className="my-3 tabel"
                    value={zoekTerm}
                    onChange={(e) => zetZoekTerm(e.target.value)}
                />

                <div className="tabel-container">
                    <Table striped bordered hover className="tabel my-5">
                        <thead>
                            <tr>
                                <th>Reservering ID:</th>
                                <th>Naam:</th>
                                <th>Van:</th>
                                <th>Tot:</th>
                                <th>Aard van reis:</th>
                                <th>Bestemming:</th>
                                <th>Verwachte afstand:</th>
                                <th>Status:</th>
                                <th>Acties</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gefilterdeAutos.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="text-center">Geen voertuigen gevonden voor uitgifte</td>
                                </tr>
                            ) : (
                                gefilterdeAutos.map((auto) => (
                                    <tr key={auto.reserveringId}>
                                        <td>{auto.reserveringId}</td>
                                        <td>{auto.fullname}</td>
                                        <td>{new Date(auto.startDatum).toLocaleDateString()}</td>
                                        <td>{new Date(auto.eindDatum).toLocaleDateString()}</td>
                                        <td>{auto.aardReis}</td>
                                        <td>{auto.bestemming}</td>
                                        <td>{auto.verwachtteKM} KM</td>
                                        <td>{auto.status}</td>
                                        <td>
                                            <Button className="knop ms-2 my-2" onClick={() => registreerUitgifte(auto)}>✅</Button>
                                            <Button className="knop ms-2 my-2" variant="danger" onClick={() => verwijderUitgifte(auto.reserveringId)}>❌</Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </div>

                <Modal show={toonModal} onHide={() => setModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Registreer Uitgifte</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formulierOpmerking">
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Voeg een opmerking toe"
                                    value={opmerking}
                                    onChange={(e) => zetOpmerking(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={opslaanUitgifte}>Registreren</Button>
                        <Button variant="danger" onClick={() => setModal(false)}>Annuleren</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
};

export default FoVoertuigUitgifte;
