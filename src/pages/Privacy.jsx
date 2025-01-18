import React from "react";
import { Container, Card } from "react-bootstrap";

const Privacy = () => {
    return (
        <div className="achtergrond2">
            <h1 className="pagina-titel text-center my-4">Privacyverklaring</h1>

            <Container className="mt-5 mb-5">
                <Card className="p-2">
                    <Card.Body>
                        <p className="mb-4">
                            <strong>CarAndAll</strong>, gevestigd aan Johanna Westerdijkplein 75, 2521 EN Den Haag, is verantwoordelijk voor de verwerking van persoonsgegevens zoals weergegeven in deze privacyverklaring.
                        </p>

                        <h5 className="mt-4 mb-3"><strong>Contactgegevens:</strong></h5>
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

                        <h5 className="mt-4 mb-3"><strong>Persoonsgegevens die wij verwerken</strong></h5>
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

                        <h5 className="mt-4 mb-3"><strong>Bijzondere en/of gevoelige persoonsgegevens die wij verwerken</strong></h5>
                        <ul className="mb-4">
                            <li>Burgerservicenummer (BSN)</li>
                        </ul>

                        <h5 className="mt-4 mb-3"><strong>Met welk doel en op basis van welke grondslag wij persoonsgegevens verwerken</strong></h5>
                        <p className="mb-4">
                            CarAndAll verwerkt uw persoonsgegevens voor de volgende doelen:
                        </p>
                        <ul className="mb-4">
                            <li>Om goederen en diensten bij u af te leveren</li>
                            <li>Te voldoen aan wettelijke verplichtingen, zoals gegevens voor belastingaangifte</li>
                        </ul>

                        <h5 className="mt-4 mb-3"><strong>Geautomatiseerde besluitvorming</strong></h5>
                        <p className="mb-4">
                            CarAndAll neemt besluiten op basis van geautomatiseerde verwerkingen die (aanzienlijke) gevolgen kunnen hebben voor personen. Dit betreft besluiten door computerprogramma's of -systemen, zonder menselijke tussenkomst. CarAndAll gebruikt de volgende systemen: <strong>#use_explanation</strong>
                        </p>

                        <h5 className="mt-4 mb-3"><strong>Hoe lang we persoonsgegevens bewaren</strong></h5>
                        <p className="mb-4">
                            CarAndAll bewaart uw persoonsgegevens niet langer dan strikt nodig is. Wij hanteren de volgende bewaartermijnen: <strong>#retention_period</strong>
                        </p>

                        <h5 className="mt-4 mb-3"><strong>Delen van persoonsgegevens met derden</strong></h5>
                        <p className="mb-4">
                            CarAndAll verstrekt persoonsgegevens uitsluitend aan derden als dit nodig is voor de uitvoering van onze overeenkomst met u of om te voldoen aan een wettelijke verplichting.
                        </p>

                        <h5 className="mt-4 mb-3"><strong>Cookies, of vergelijkbare technieken, die wij gebruiken</strong></h5>
                        <p className="mb-4">
                            CarAndAll gebruikt alleen technische en functionele cookies en analytische cookies die geen inbreuk maken op uw privacy. U kunt zich afmelden door uw browserinstellingen aan te passen.
                        </p>

                        <h5 className="mt-4 mb-3"><strong>Gegevens inzien, aanpassen of verwijderen</strong></h5>
                        <p className="mb-4">
                            U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te verwijderen. Voor verzoeken kunt u contact opnemen via <a href="mailto:carandall@privacy.com">carandall@privacy.com</a>. Om uw privacy te beschermen, vragen wij een kopie van uw identiteitsbewijs mee te sturen, waarbij gevoelige informatie zwart is gemaakt. Wij reageren binnen vier weken.
                        </p>

                        <h5 className="mt-4 mb-3"><strong>Hoe wij persoonsgegevens beveiligen</strong></h5>
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
