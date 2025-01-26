import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BoNavbar from '../components/BoNavbar';
import FoNavbar from '../components/FoNavbar';
import PartNavbar from "../components/PartNavbar.jsx";
import WbNavbar from '../components/WbNavbar';

const Privacy = () => {
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

                        {/* De rest van je privacyverklaring hier */}
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

                        {/* Verdere inhoud van de privacyverklaring */}
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Privacy;
