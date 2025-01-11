import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Container,
    Table,
    Button,
    Modal,
    Form,
    FormControl,
} from "react-bootstrap";

const FoVoertuigUitgifte = () => {
    const [autos, zetAutos] = useState([]); // Bevat de lijst met auto's
    const [zoekTerm, zetZoekTerm] = useState(""); // Zoekterm voor filtering
    const [geselecteerdeAuto, zetGeselecteerdeAuto] = useState(null); // Geselecteerde auto
    const [toonModal, zetToonModal] = useState(false); // Modal zichtbaar?
    const [opmerking, zetOpmerking] = useState(""); // Opmerking voor uitgifte
    const [laadFout, zetLaadFout] = useState(null); // Error state

    // Data ophalen bij component mount
    useEffect(() => {
        const haalReserveringenOp = async () => {
            try {
                const respons = await axios.get(
                    "https://localhost:7281/api/Reserveringen/GetAllReserveringen"
                );
                const data = respons.data;
                zetAutos(data);
            } catch (error) {
                zetLaadFout("Kon de reserveringen niet ophalen. Controleer de API.");
                console.error(error);
            }
        };
        haalReserveringenOp();
    }, []);

    const registreerUitgifte = (auto) => {
        zetGeselecteerdeAuto(auto);
        zetToonModal(true);
    };

    const opslaanUitgifte = async () => {
        try {
            const verzoekId = geselecteerdeAuto.reserveringId;
            await axios.post(
                `https://localhost:7281/api/FrontOfficeMedewerker/GeefVoertuiguit`,
                { verzoekId }
            );
            console.log(`Registratie succesvol voor verzoekId: ${verzoekId}`);
            // Verwijder het goedgekeurde verzoek uit de lijst
            zetAutos(autos.filter((auto) => auto.reserveringId !== verzoekId));
        } catch (error) {
            console.error("Fout bij het registreren van de uitgifte:", error);
        } finally {
            zetToonModal(false);
            zetGeselecteerdeAuto(null);
            zetOpmerking("");
        }
    };

    const verwijderUitgifte = async (verzoekId) => {
        try {
            await axios.post(
                `https://localhost:7281/api/FrontOfficeMedewerker/NeemVoertuigIn`, verzoekId
            );
            console.log(`Verzoek met ID ${verzoekId} afgewezen.`);
            // Verwijder het afgewezen verzoek uit de lijst
            zetAutos(autos.filter((auto) => auto.reserveringId !== verzoekId));
        } catch (error) {
            console.error("Fout bij het verwijderen van de uitgifte:", error);
        }
    };

    // Filter auto's op basis van de zoekterm
    const gefilterdeAutos = autos.filter((auto) =>
        Object.values(auto)
            .join(" ")
            .toLowerCase()
            .includes(zoekTerm.toLowerCase())
    );

    return (
        <div className="achtergrond2">
            <Container fluid>
                <h1 className="pagina-titel text-center my-5">
                    Beschikbare Auto's voor Uitgifte
                </h1>

                {/* Error melding */}
                {laadFout && (
                    <div className="alert alert-danger text-center">{laadFout}</div>
                )}

                {/* Zoekveld */}
                <FormControl
                    type="text"
                    placeholder="Zoek op naam, bestemming of andere velden..."
                    className="my-3 tabel"
                    value={zoekTerm}
                    onChange={(e) => zetZoekTerm(e.target.value)}
                />

                {/* Tabel container */}
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

                {/* Modal voor registratie */}
                <Modal show={toonModal} onHide={() => zetToonModal(false)}>
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
                        <Button variant="danger" onClick={() => zetToonModal(false)}>
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
