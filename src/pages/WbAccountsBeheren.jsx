import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, FormControl, Table, InputGroup, Modal, Container } from 'react-bootstrap';
import WbNavbar from "../components/WbNavbar.jsx";

const WbAccountsBeheren = () => {
    const [accounts, setAccounts] = useState([]);
    const [zoekterm, setZoekterm] = useState('');
    const [toonModal, setModal] = useState(false);
    const [teVerwerkenAccount, setTeVerwerkenAccount] = useState(null);
    const [actieType, setActieType] = useState('goedkeuren'); // 'goedkeuren', 'weigeren', of 'verwijderen'

    // Haal de accountgegevens op bij de eerste render
    useEffect(() => {
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
                // Mapt de gegevens naar een nieuw formaat voor de accs
                const mappedAccounts = response.data.map((item) => ({
                    id: item.wagenparkVerzoekId,
                    naam: `User ${item.voornaam}`,
                    email: `${item.email}`,
                    isGoedgekeurd: false
                }));

                setAccounts(mappedAccounts);
            } catch (error) {
                console.error('Fout bij ophalen van data:', error);
            }
        };

        fetchAccounts();
    }, []);

    // Filter accounts op basis van zoekterm
    const gefilterdeAccounts = accounts.filter((account) =>
        account.naam.toLowerCase().includes(zoekterm.toLowerCase())
    );

    // Functie om account goed te keuren
    const goedkeurenAccount = (account) => {
        setAccounts(accounts.map(a =>
            a.id === account.id ? { ...a, isGoedgekeurd: true } : a
        ));
    };

    // Functie om account te weigeren
    const weigerenAccount = (account) => {
        setAccounts(accounts.filter(a => a.id !== account.id));
    };

    // Toon de modal voor de geselecteerde actie
    const toonModalVoorActie = (account, type) => {
        setTeVerwerkenAccount(account);
        setActieType(type);
        setModal(true);
    };

    // Sluit de modal zonder actie
    const sluitModal = () => {
        setModal(false);
        setTeVerwerkenAccount(null);
    };

    // Voer goedkeuren actie uit
    const voerGoedkeurenUit = async () => {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }

        try {
            const baseURL = 'https://localhost:7281/api/WagenParkBeheer';
            const payload = { id: teVerwerkenAccount.id };

            await axios.post(`${baseURL}/AddUserToWagenPark`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            goedkeurenAccount(teVerwerkenAccount);
            sluitModal();
        } catch (error) {
            console.error(`Fout bij goedkeuren van gebruiker:`, error.message);
        }
    };

    // Voer weigeren of verwijderen actie uit
    const voerWeigerenOfVerwijderenUit = async () => {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
            console.error('JWT-token ontbreekt in sessionStorage.');
            return;
        }

        try {
            const baseURL = 'https://localhost:7281/api/WagenParkBeheer';
            const payload = { id: teVerwerkenAccount.id };

            await axios.post(`${baseURL}/DenyUserToWagenPark`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            weigerenAccount(teVerwerkenAccount);
            sluitModal();
        } catch (error) {
            console.error(`Fout bij weigeren of verwijderen van gebruiker:`, error.message);
        }
    };

    return (
        <div className="achtergrond2">
            <WbNavbar />
            <Container fluid className="align-items-center w-75">
                <h1 className="pagina-titel text-center my-5">Zakelijke Huurders Beheren</h1>

                <div className="d-flex justify-content-center mb-3">
                    <InputGroup>
                        <FormControl
                            placeholder="Zoek medewerkers"
                            aria-label="Zoek medewerkers"
                            value={zoekterm}
                            onChange={(e) => setZoekterm(e.target.value)}
                        />
                    </InputGroup>
                </div>

                <div className="autovinden">
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Naam</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Acties</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gefilterdeAccounts.length > 0 ? (
                                gefilterdeAccounts.map((account) => (
                                    <tr key={account.id}>
                                        <td>{account.naam}</td>
                                        <td>{account.email}</td>
                                        <td>{account.isGoedgekeurd ? 'Goedgekeurd' : 'In afwachting'}</td>
                                        <td>
                                            {!account.isGoedgekeurd ? (
                                                <>
                                                    <Button
                                                        variant="success"
                                                        className="me-2"
                                                        onClick={() => toonModalVoorActie(account, 'goedkeuren')}
                                                    >
                                                        Goedkeuren
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => toonModalVoorActie(account, 'weigeren')}
                                                    >
                                                        Weigeren
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button
                                                    variant="danger"
                                                    onClick={() => toonModalVoorActie(account, 'verwijderen')}
                                                >
                                                    Verwijderen
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">
                                        <em>Geen medewerkers gevonden...</em>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </Container>

            <Modal show={toonModal} onHide={sluitModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {actieType === 'goedkeuren'
                            ? 'Gebruiker Goedkeuren'
                            : actieType === 'verwijderen'
                                ? 'Gebruiker Verwijderen'
                                : 'Gebruiker Weigeren'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {actieType === 'goedkeuren'
                        ? `Ben je zeker dat je ${teVerwerkenAccount?.naam} wilt goedkeuren?`
                        : actieType === 'verwijderen'
                            ? `Ben je zeker dat je ${teVerwerkenAccount?.naam} wilt verwijderen? Dit kan niet ongedaan gemaakt worden.`
                            : `Ben je zeker dat je ${teVerwerkenAccount?.naam} wilt weigeren? Dit kan niet ongedaan gemaakt worden.`}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={sluitModal}>
                        Annuleren
                    </Button>
                    <Button
                        variant={actieType === 'goedkeuren' ? 'success' : 'danger'}
                        onClick={
                            actieType === 'goedkeuren'
                                ? voerGoedkeurenUit
                                : voerWeigerenOfVerwijderenUit
                        }
                    >
                        {actieType === 'goedkeuren' ? 'Goedkeuren' : 'Bevestigen'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default WbAccountsBeheren;
