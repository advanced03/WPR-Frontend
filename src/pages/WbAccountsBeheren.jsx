import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, FormControl, Table, InputGroup, Modal, Container } from 'react-bootstrap';
import WbNavbar from "../components/WbNavbar.jsx";

const WbAccountsBeheren = () => {
    const [accounts, setAccounts] = useState([]);
    const [zoekterm, setZoekterm] = useState('');
    const [toonToevoegenModal, setToevoegenModal] = useState(false);
    const [nieuwEmail, setNieuwEmail] = useState('');

    const fetchAccounts = async () => {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }

        try {
            const response = await axios.get('https://localhost:7281/api/WagenParkBeheer/GetAllWagenParkUsers', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const mappedAccounts = response.data.map((item) => ({
                id: item.appUserId,
                naam: `User ${item.username}`,
                email: `${item.email}`
            }));
            setAccounts(mappedAccounts);
        } catch (error) {
            console.error('Fout bij ophalen van data:', error);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    const gefilterdeAccounts = accounts.filter((account) =>
        account.naam.toLowerCase().includes(zoekterm.toLowerCase())
    );

    const verwijderAccount = async (accountId) => {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }
        console.log(accountId)
        try {
            const baseURL = 'https://localhost:7281/api/WagenParkBeheer';
            const payload = JSON.stringify(accountId); // Converteer accountId naar een JSON-string

            await axios.delete(`${baseURL}/RemoveUserFromWagenPark`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                data: payload, // Verstuur het accountId als body van de DELETE-aanroep
            });

            // Vernieuw de lijst van accounts na succesvolle verwijdering
            fetchAccounts();
        } catch (error) {
            console.error(`Fout bij verwijderen van gebruiker met ID ${accountId}:`, error.message);
        }
    };


    const voegNieuweGebruikerToe = async () => {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }

        try {
            const baseURL = 'https://localhost:7281/api/WagenParkBeheer';
            const payload = { email: nieuwEmail };

            await axios.put(`${baseURL}/NodigGebruikerUitVoorWagenpark`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setToevoegenModal(false); // Sluit de modal
            setNieuwEmail(''); // Reset het e-mailadres
            fetchAccounts(); // Vernieuw de lijst van accounts
        } catch (error) {
            console.error('Fout bij toevoegen van nieuwe gebruiker:', error.message);
        }
    };

    return (
        <div className="achtergrond2">
            <WbNavbar />
            <Container fluid className="align-items-center w-75">
                <h1 className="pagina-titel text-center my-5">Zakelijke Huurders Beheren</h1>

                <div className="d-flex justify-content-between mb-3">
                    <InputGroup>
                        <FormControl
                            placeholder="Zoek medewerkers"
                            aria-label="Zoek medewerkers"
                            value={zoekterm}
                            onChange={(e) => setZoekterm(e.target.value)}
                        />
                    </InputGroup>
                    <Button variant="primary" onClick={() => setToevoegenModal(true)}>
                        Gebruiker Toevoegen
                    </Button>
                </div>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Naam</th>
                            <th>Email</th>
                            <th>Acties</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gefilterdeAccounts.length > 0 ? (
                            gefilterdeAccounts.map((account) => (
                                <tr key={account.id}>
                                    <td>{account.naam}</td>
                                    <td>{account.email}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            onClick={() => verwijderAccount(account.id)}
                                        >
                                            Verwijderen
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">
                                    <em>Geen medewerkers gevonden...</em>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>

            <Modal show={toonToevoegenModal} onHide={() => setToevoegenModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Gebruiker Toevoegen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                        placeholder="Voer het e-mailadres in"
                        value={nieuwEmail}
                        onChange={(e) => setNieuwEmail(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setToevoegenModal(false)}>
                        Annuleren
                    </Button>
                    <Button variant="success" onClick={voegNieuweGebruikerToe}>
                        Toevoegen
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default WbAccountsBeheren;

