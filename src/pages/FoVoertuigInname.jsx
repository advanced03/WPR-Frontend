import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Modal, Form, FormControl } from 'react-bootstrap';
import FoNavbar from "../components/FoNavbar"

const FoVoertuigInname = () => {
    const [autos, zetAutos] = useState([]); // Bevat de lijst van auto's
    const [zoekTerm, zetZoekTerm] = useState(''); // Zoekterm voor filtering
    const [geselecteerdeAuto, zetGeselecteerdeAuto] = useState(null); // Geselecteerde auto
    const [toonModal, zetToonModal] = useState(false); // Modal zichtbaar?
    const [schadeInfo, zetSchadeInfo] = useState(''); // Beschrijving van schade
    const [heeftSchade, zetHeeftSchade] = useState(false); // Schade aanwezig of niet
    const [foutmeldingen, zetFoutmeldingen] = useState({ schadeInfo: false }); // Validatie fouten

    // Data ophalen bij component mount
    useEffect(() => {
        const haalReserveringenOp = async () => {
            try {
                const respons = await axios.get('https://localhost:7281/api/Reserveringen/GetAllReserveringen');
                zetAutos(respons.data);
            } catch (error) {
                console.error('Fout bij het ophalen van reserveringen:', error);
            }
        };

        haalReserveringenOp();
    }, []);

    const registreerInname = (auto) => {
        zetGeselecteerdeAuto(auto);
        zetToonModal(true);
    };

    const opslaanInname = () => {
        // Validatie voor schade
        if (heeftSchade) {
            const fouten = {
                schadeInfo: schadeInfo.trim() === '',
            };
            zetFoutmeldingen(fouten);

            if (fouten.schadeInfo) {
                return;
            }
        }

        console.log(`Auto: ${geselecteerdeAuto.fullname}`);
        console.log(`Schade: ${heeftSchade ? schadeInfo : 'Geen schade'}`);
        console.log(`Datum schade: ${heeftSchade ? new Date().toLocaleDateString() : 'Geen schade'}`);

        // Verwijder de ingeleverde auto uit de lijst
        zetAutos(autos.filter((auto) => auto.reserveringId !== geselecteerdeAuto.reserveringId));

        zetToonModal(false);
        zetGeselecteerdeAuto(null);
        zetSchadeInfo('');
        zetHeeftSchade(false);
        zetFoutmeldingen({ schadeInfo: false });
    };

    // Gefilterde lijst van auto's
    const gefilterdeAutos = autos.filter((auto) =>
        Object.values(auto)
            .join(' ')
            .toLowerCase()
            .includes(zoekTerm.toLowerCase())
    );

    return (
        <div className='achtergrond2'>
            <FoNavbar />
            <Container fluid>
                <h1 className="pagina-titel text-center my-5">Uitgehuurde Auto's</h1>

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
                                <th>Verwachte KM</th>
                                <th>Status</th>
                                <th>Registreer inname</th>
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
                                        <Button className="knop" onClick={() => registreerInname(auto)}>⚙️</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                <Modal show={toonModal} onHide={() => zetToonModal(false)}>
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
                                        <Form.Control
                                            type="text"
                                            value={new Date().toLocaleDateString()}
                                            readOnly
                                            className="mt-2"
                                        />
                                    </>
                                )}
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => zetToonModal(false)}>
                            Annuleren
                        </Button>
                        <Button variant="success" onClick={opslaanInname}>
                            Registreren
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
};

export default FoVoertuigInname;

