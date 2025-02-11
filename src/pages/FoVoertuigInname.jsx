﻿// Import statements
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Modal, Form, FormControl, Alert } from 'react-bootstrap';
import FoNavbar from "../components/FoNavbar";

const FoVoertuigInname = () => {
    const [autos, zetAutos] = useState([]);
    const [zoekTerm, zetZoekTerm] = useState('');
    const [geselecteerdeAuto, zetGeselecteerdeAuto] = useState(null);
    const [toonModal, setModal] = useState(false);
    const [schadeInfo, zetSchadeInfo] = useState('');
    const [heeftSchade, zetHeeftSchade] = useState(false);
    const [foutmeldingen, zetFoutmeldingen] = useState({ schadeInfo: false });
    const [melding, zetMelding] = useState(null);
    // Ophalen van reserveringen bij het laden van de pagina
    useEffect(() => {
        haalReserveringenOp();
    }, []);

    //Toon alert melding
    const toonMelding = (boodschap, variant = "success") => {
        zetMelding({ boodschap, variant });
        setTimeout(() => zetMelding(null), 3000);
    };
    // Methode om reserveringen ophalen.
    const haalReserveringenOp = async () => {
        try {
            const respons = await axios.get('https://localhost:7281/api/Reserveringen/GetAllReserveringen');
            zetAutos(respons.data);
        } catch (error) {
            console.error('Fout bij het ophalen van reserveringen:', error);
        }
    };
    // Inname registreren
    const registreerInname = (auto) => {
        zetGeselecteerdeAuto(auto);
        setModal(true);
    };
    // Inname opslaan
    const opslaanInname = async () => {
        if (heeftSchade && schadeInfo.trim() === '') {
            zetFoutmeldingen({ schadeInfo: true });
            return;
        }

        // API call
        const data = {
            reserveringId: geselecteerdeAuto.reserveringId,
            isSchade: heeftSchade,
            schade: heeftSchade ? schadeInfo : null,
            geredenKilometers: geselecteerdeAuto.geredenKilometers || 0,
            beschrijvingFoto: null,
        };

        try {
            const token = sessionStorage.getItem('jwtToken');
            if (!token) {
                console.error('JWT-token ontbreekt in sessionStorage.');
                return;
            }

            await axios.put('https://localhost:7281/api/FrontOfficeMedewerker/NeemIn', data, {
                headers: { Authorization: `Bearer ${token}` },
            });

            haalReserveringenOp();
            toonMelding("Inname succesvol geregistreerd!", "success");

            setModal(false);
            zetGeselecteerdeAuto(null);
            zetSchadeInfo('');
            zetHeeftSchade(false);
            zetFoutmeldingen({ schadeInfo: false });
        } catch (error) {
            console.error('Fout bij het registreren van de inname:', error.response?.data || error.message);
            toonMelding("Fout bij inname registratie!", "danger");
        }
    };
    // Filteren van reserveringen
    const gefilterdeAutos = autos.filter((auto) => {
        const zoekString = zoekTerm.trim().toLowerCase();
        return (
            // Filteren op basis van zoekterm
            auto.status.toLowerCase() === 'uitgegeven' && // Only "Uitgegeven" status
            (
                auto.fullname.toLowerCase().includes(zoekString) ||
                auto.bestemming.toLowerCase().includes(zoekString) ||
                auto.aardReis.toLowerCase().includes(zoekString) ||
                auto.status.toLowerCase().includes(zoekString) ||
                auto.reserveringId.toString().includes(zoekString) ||
                auto.verwachtteKM.toString().includes(zoekString)
            )
        );
    });

    return (
        <div className='achtergrond2'>
            <FoNavbar />
            <Container fluid>
                <h1 className="pagina-titel text-center my-5">Voertuig inname registreren</h1>

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
                                <th>Inname registreren</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Als er geen reserveringen zijn, toon een melding */}
                            {gefilterdeAutos.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="text-center">Geen openstaande huurverzoeken gevonden</td>
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
                                            <Button
                                                className="knop"
                                                onClick={() => registreerInname(auto)}
                                                disabled={auto.status === "Afgerond"}
                                            >
                                                ⚙️
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </div>

                <Modal show={toonModal} onHide={() => setModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Registreer Inname</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formulierSchade">
                                <Form.Check
                                    type="checkbox"
                                    label="Schade aanwezig"
                                    checked={heeftSchade}
                                    onChange={(e) => zetHeeftSchade(e.target.checked)}
                                />
                                {/* Als er schade is, toon een extra tekstveld */}
                                {heeftSchade && (
                                    <>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder="Beschrijf de schade"
                                            value={schadeInfo}
                                            onChange={(e) => zetSchadeInfo(e.target.value)}
                                            className={`mt-2 ${foutmeldingen.schadeInfo ? 'is-invalid' : ''}`}
                                        />
                                        {foutmeldingen.schadeInfo && (
                                            <div className="invalid-feedback">Beschrijf de schade, dit veld is verplicht.</div>
                                        )}
                                    </>
                                )}
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={opslaanInname}>Registreren</Button>
                        <Button variant="danger" onClick={() => setModal(false)}>Annuleren</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
};

export default FoVoertuigInname;
