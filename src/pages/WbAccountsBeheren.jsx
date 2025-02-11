// Code written
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, FormControl, Table, InputGroup, Modal, Container, Alert } from 'react-bootstrap';
import WbNavbar from "../components/WbNavbar.jsx";

const WbAccountsBeheren = () => {
    // State variabelen
    const [accounts, setAccounts] = useState([]);
    const [zoekterm, setZoekterm] = useState('');
    const [toonToevoegenModal, setToevoegenModal] = useState(false);
    const [nieuwEmail, setNieuwEmail] = useState('');
    const [succesBericht, setSuccesBericht] = useState(null);

    //dit is een methode om de informatie op te halen van alle gebruikers van een wagenpark
    const fetchAccounts = async () => {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }
        // Dit is een GET request om alle gebruikers van een wagenpark op te halen
        try {
            const response = await axios.get('https://localhost:7281/api/WagenParkBeheer/GetAllWagenParkUsers', {
                headers: { Authorization: `Bearer ${token}` }
            });
            // De data wordt gemapt naar een array van objecten
            const mappedAccounts = response.data.map((item) => ({
                id: item.appUserId,
                naam: `${item.username}`,
                email: `${item.email}`
            }));
            setAccounts(mappedAccounts);
        } catch (error) {
            console.error('Fout bij ophalen van data:', error);
        }
    };
    // fetchAccounts functie aanroepen als de pagina laad.
    useEffect(() => {
        fetchAccounts();
    }, []);

    const gefilterdeAccounts = accounts.filter((account) =>
        account.naam.toLowerCase().includes(zoekterm.toLowerCase())
    );
    // Dit is een methode om een gebruiker te verwijderen van een wagenpark
    const verwijderAccount = async (accountId) => {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }
        // Dit is een verwijder verzoek om een gebruiker te verwijderen van een wagenpark
        try {
            await axios.delete(`https://localhost:7281/api/WagenParkBeheer/RemoveUserFromWagenPark`, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                data: JSON.stringify(accountId),
            });

            fetchAccounts(); // Vernieuw de lijst na verwijderen
        } catch (error) {
            console.error(`Fout bij verwijderen van gebruiker met ID ${accountId}:`, error.message);
        }
    };
 // Dit is een methode om een nieuwe gebruiker toe te voegen aan een wagenpark
    const voegNieuweGebruikerToe = async () => {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }

        try {
            await axios.put(
                'https://localhost:7281/api/WagenParkBeheer/NodigGebruikerUitVoorWagenpark',
                { email: nieuwEmail }, // E-mailadres van de nieuwe gebruiker
                { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
            );

            setSuccesBericht(`Gebruiker met e-mail ${nieuwEmail} is succesvol toegevoegd!`); // Succesbericht tonen
            setTimeout(() => setSuccesBericht(null), 3000); // Verdwijn na 3 seconden
            setToevoegenModal(false);
            setNieuwEmail('');
            fetchAccounts();
            // Laat een foutmelding zien als het toevoegen van een nieuwe gebruiker niet lukt
        } catch (error) {
            console.error('Fout bij toevoegen van nieuwe gebruiker:', error.message);
        }
    };

    return (
        <div className="achtergrond2">
            <WbNavbar />
            <Container fluid className="align-items-center w-75">
                <h1 className="pagina-titel text-center my-5">Zakelijke Huurders Beheren</h1>

                {succesBericht && <Alert variant="success">{succesBericht}</Alert>} {/* Succesmelding */}

                <div className="d-flex justify-content-between mb-3">
                    <InputGroup>
                        <FormControl
                            placeholder="Zoek medewerkers"
                            aria-label="Zoek medewerkers"
                            value={zoekterm}
                            onChange={(e) => setZoekterm(e.target.value)}
                        />
                    </InputGroup>
                    <Button className="knop" onClick={() => setToevoegenModal(true)}>
                        Gebruiker Toevoegen
                    </Button>
                </div>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Naam</th>
                            <th>Email</th>
                            <th>Verwijderen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Als er geen medewerkers zijn gevonden, laat dan een bericht zien */}
                        {gefilterdeAccounts.length > 0 ? (
                            gefilterdeAccounts.map((account) => (
                                <tr key={account.id}>
                                    <td>{account.naam}</td>
                                    <td>{account.email}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => verwijderAccount(account.id)}>
                                            🗑️
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : ( // Als er geen medewerkers zijn gevonden, laat dan een bericht zien
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
                    <Button variant="success" onClick={voegNieuweGebruikerToe}>
                        Toevoegen
                    </Button>
                    <Button variant="danger" onClick={() => setToevoegenModal(false)}>
                        Annuleren
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default WbAccountsBeheren;
