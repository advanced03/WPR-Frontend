import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Modal, Form, FormControl } from 'react-bootstrap';
import FoNavbar from "../components/FoNavbar";

const FoVoertuigUitgifte = () => {
    // State voor auto's, zoekterm, geselecteerde auto, modaal, opmerkingen en foutmeldingen
    const [autos, zetAutos] = useState([]);
    const [zoekTerm, zetZoekTerm] = useState("");
    const [geselecteerdeAuto, zetGeselecteerdeAuto] = useState(null);
    const [toonModal, setModal] = useState(false);
    const [opmerking, zetOpmerking] = useState("");
    const [laadFout, zetLaadFout] = useState(null);

    // Haal reserveringen op bij laden van de component
    const haalReserveringenOp = async () => {
        try {
            const respons = await axios.get(
                "https://localhost:7281/api/Reserveringen/GetAllReserveringen"
            );
            zetAutos(respons.data);
            zetLaadFout(null); // Reset foutmelding
        } catch (error) {
            zetLaadFout("Kon de reserveringen niet ophalen. Controleer de API.");
            console.error(error);
        }
    };

    useEffect(() => {
        haalReserveringenOp();
    }, []);

    // Open het modaal om een uitgifte te registreren
    const registreerUitgifte = (auto) => {
        zetGeselecteerdeAuto(auto);
        setModal(true);
    };

    // Registreer de uitgifte van een auto en werk de lijst bij
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
            haalReserveringenOp(); // Ververs de data
        } catch (error) {
            console.error("Fout bij het registreren van de uitgifte:", error);
        } finally {
            setModal(false);
            zetGeselecteerdeAuto(null);
            zetOpmerking("");
        }
    };

    // Annuleer de uitgifte van een auto
    const verwijderUitgifte = async(reserveringsId) => {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }
    
        try {
            const reserveringsId = geselecteerdeAuto.reserveringId;
            await axios.delete(
                'https://localhost:7281/api/Reserveringen/VerwijderReservering/{reserveringId}',
                { reserveringsId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            haalReserveringenOp(); // Ververs de data
        } catch (error) {
            console.error("Fout bij het verwijderen van de uitgifte:", error);
        }
    };

    // Filter de auto's op zoekterm
    const gefilterdeAutos = autos.filter((auto) =>
        Object.values(auto)
            .join(" ")
            .toLowerCase()
            .includes(zoekTerm.toLowerCase())
    );

    return (
        <div className='achtergrond2'>
            <FoNavbar />
            <Container fluid>
                <h1 className="pagina-titel text-center my-5">Beschikbare Auto's voor Uitgifte</h1>

                {/* Zoekbalk */}
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
                                <th>Reservering ID</th>
                                <th>Naam</th>
                                <th>Startdatum</th>
                                <th>Einddatum</th>
                                <th>Aard van reis</th>
                                <th>Bestemming</th>
                                <th>Verwachtte KM</th>
                                <th>Status</th>
                                <th>Acties</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gefilterdeAutos.map((auto) => (
                                <tr key={auto.reserveringId}>
                                    <td>{auto.reserveringId}</td>
                                    <td>{auto.fullname}</td>
                                    <td>{new Date(auto.startDatum).toLocaleDateString()}</td>
                                    <td>{new Date(auto.eindDatum).toLocaleDateString()}</td>
                                    <td>{auto.aardReis}</td>
                                    <td>{auto.bestemming}</td>
                                    <td>{auto.verwachtteKM}</td>
                                    <td>{auto.status}</td>
                                    <td>
                                        <Button
                                            className="knop"
                                            onClick={() => registreerUitgifte(auto)}
                                        >
                                            ✅
                                        </Button>
                                        <Button
                                            className="knop ms-2"
                                            variant="danger"
                                            onClick={() => verwijderUitgifte(auto.reserveringId)}
                                        >
                                            ❌
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                {/* Modal layout ui*/}
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
                        <Button variant="danger" onClick={() => setModal(false)}>
                            Annuleren
                        </Button>
                        <Button variant="success" onClick={opslaanUitgifte}>
                            Registreren
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
};

export default FoVoertuigUitgifte;
