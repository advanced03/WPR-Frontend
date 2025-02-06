// Import statements
import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BoNavbar from '../components/BoNavbar';
import FoNavbar from '../components/FoNavbar';
import PartNavbar from "../components/PartNavbar.jsx";
import WbNavbar from '../components/WbNavbar';

const Privacy = () => {
    // State variabelen
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Functie om de rol van de gebruiker op te halen (via token of API call)
    const fetchUserRole = async () => {
        const token = sessionStorage.getItem('jwtToken');
        if (token) {
            try {
                const response = await axios.get('https://localhost:7281/api/account/getUserData', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRole(response.data.role);
                setLoading(false);
            } catch (error) {
                console.error('Fout bij het ophalen van gebruikersgegevens:', error);
                setLoading(false);
            }
        } else {
            // Geen token aanwezig, stuur de gebruiker naar de loginpagina
            setLoading(false);
            navigate('/login');
        }
    };

    useEffect(() => {
        fetchUserRole();
    }, []);

    // Zorg ervoor dat de rol is geladen voordat je verder gaat
    if (loading) {
        return <div>Loading...</div>;
    }

    // Render de juiste navbar op basis van de rol
    const renderNavbar = () => {
        switch (role) {
            case 'backendWorker':
                return <BoNavbar />;
            case 'wagenparkBeheerder':
                return <WbNavbar />;
            case 'particuliereKlant':
            case 'bedrijfsKlant':
                return <PartNavbar />;
            case 'frontendWorker':
                return <FoNavbar />;
            default:
                return <PartNavbar />;
        }
    };

    return (
        <div className="achtergrond2">
            {renderNavbar()} {/* Navbar op basis van de rol */}
            <h1 className="pagina-titel text-center my-5">Privacyverklaring</h1>
            <Container className="p-3 my-3">
                <Card className="p-3 shadow">
                    <Card.Body>
                        <p className="mb-4">
                            <strong>CarAndAll</strong>, gevestigd aan Johanna Westerdijkplein 75, 2521 EN Den Haag, is verantwoordelijk voor de verwerking van persoonsgegevens zoals weergegeven in deze privacyverklaring.
                        </p>

                        <h5 className="mt-4 mb-3">📞 <strong>Contactgegevens:</strong></h5>
                        <p className="mb-4">
                            <a href="https://carandall.com" target="_blank" rel="noopener noreferrer">
                                https://carandall.com
                            </a><br />
                            Johanna Westerdijkplein 75<br />
                            2521 EN Den Haag<br />
                            31 123456789<br />
                            <strong>Ismail Yildiz</strong>, Functionaris Gegevensbescherming<br />
                            <a href="mailto:22115862@student.hhs.nl">22115862@student.hhs.nl</a>
                        </p>

                        <h5 className="mt-4 mb-3">👤 <strong>Persoonsgegevens die wij verwerken</strong></h5>
                        <p className="mb-4">
                            CarAndAll verwerkt uw persoonsgegevens doordat u gebruik maakt van onze diensten en/of omdat u deze zelf aan ons verstrekt. Hieronder vindt u een overzicht van de persoonsgegevens die wij verwerken:
                        </p>
                        <ul className="mb-4">
                            <li>Voor- en achternaam</li>
                            <li>Geboortedatum</li>
                            <li>Adresgegevens</li>
                            <li>Telefoonnummer</li>
                            <li>E-mailadres</li>
                            <li>Overige persoonsgegevens die u actief verstrekt (bijvoorbeeld door een profiel aan te maken, in correspondentie of telefonisch)</li>
                            <li>Locatiegegevens</li>
                            <li>Bankrekeningnummer</li>
                        </ul>

                        <h5 className="mt-4 mb-3">🔒 <strong>Bijzondere en/of gevoelige persoonsgegevens die wij verwerken</strong></h5>
                        <ul className="mb-4">
                            <li>Rijbewijsnummer</li>
                        </ul>

                        <h5 className="mt-4 mb-3">🎯 <strong>Met welk doel en op basis van welke grondslag wij persoonsgegevens verwerken</strong></h5>
                        <p className="mb-4">
                            CarAndAll verwerkt uw persoonsgegevens voor de volgende doelen:
                        </p>
                        <ul className="mb-4">
                            <li>Om goederen en diensten bij u af te leveren</li>
                            <li>Te voldoen aan wettelijke verplichtingen, zoals gegevens voor belastingaangifte</li>
                        </ul>

                        <h5 className="mt-4 mb-3">⏳ <strong>Hoe lang we persoonsgegevens bewaren</strong></h5>
                        <Table striped bordered hover className="mb-4">
                            <thead>
                                <tr>
                                    <th>Type Gegevens</th>
                                    <th>Bewaartijd</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Overige gegevens</td>
                                    <td>6 maanden</td>
                                </tr>
                                <tr>
                                    <td>Financiele gegevens</td>
                                    <td>7 Jaar</td>
                                </tr>
                            </tbody>
                        </Table>

                        <h5 className="mt-4 mb-3">📤 <strong>Delen van persoonsgegevens met derden</strong></h5>
                        <p className="mb-4">
                            CarAndAll verstrekt persoonsgegevens uitsluitend aan derden als dit nodig is voor de uitvoering van onze overeenkomst met u of om te voldoen aan een wettelijke verplichting.
                        </p>

                        <h5 className="mt-4 mb-3">🍪 <strong>Cookies, of vergelijkbare technieken, die wij gebruiken</strong></h5>
                        <p className="mb-4">
                            CarAndAll gebruikt alleen technische en functionele cookies en analytische cookies die geen inbreuk maken op uw privacy. U kunt zich afmelden door uw browserinstellingen aan te passen.
                        </p>

                        <h5 className="mt-4 mb-3">🔍 <strong>Gegevens inzien, aanpassen of verwijderen</strong></h5>
                        <p className="mb-4">
                            U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te verwijderen. Voor verzoeken kunt u contact opnemen via <a href="mailto:carandall@privacy.com">carandall@privacy.com</a>. Om uw privacy te beschermen, vragen wij een kopie van uw identiteitsbewijs mee te sturen, waarbij gevoelige informatie zwart is gemaakt. Wij reageren binnen vier weken.
                        </p>

                        <h5 className="mt-4 mb-3">🛡️ <strong>Hoe wij persoonsgegevens beveiligen</strong></h5>
                        <p className="mb-4">
                            CarAndAll neemt passende maatregelen om uw gegevens te beveiligen. Bij vermoedens van misbruik, neem contact op via <a href="mailto:carandall@privacy.com">carandall@privacy.com</a>.
                        </p>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Privacy;
