import React, { useState } from 'react';
import { Container, Table, Button, Modal, Form, FormControl } from 'react-bootstrap';
import FoNavbar from "../components/FoNavbar"

const FoVoertuigUitgifte = () => {
  const [autos, zetAutos] = useState([
    { id: 1, voorNaam: 'Jan', achterNaam: 'Jansen', adres: 'Straat 123', rijbewijsNummer: 'AB123456', aardVanRit: 'Privé', versteBestemming: 'Amsterdam', verwachteKilometers: 200 },
    { id: 2, voorNaam: 'Piet', achterNaam: 'Pietersen', adres: 'Laan 456', rijbewijsNummer: 'CD789012', aardVanRit: 'Zakelijk', versteBestemming: 'Rotterdam', verwachteKilometers: 350 },
    { id: 3, voorNaam: 'Klaas', achterNaam: 'de Vries', adres: 'Hoofdweg 12', rijbewijsNummer: 'EF345678', aardVanRit: 'Privé', versteBestemming: 'Utrecht', verwachteKilometers: 150 },
    { id: 4, voorNaam: 'Sanne', achterNaam: 'Bakker', adres: 'Plein 8', rijbewijsNummer: 'GH901234', aardVanRit: 'Zakelijk', versteBestemming: 'Den Haag', verwachteKilometers: 400 },
    { id: 5, voorNaam: 'Jeroen', achterNaam: 'Schmidt', adres: 'Singel 234', rijbewijsNummer: 'IJ567890', aardVanRit: 'Privé', versteBestemming: 'Leiden', verwachteKilometers: 120 },
  ]);

  const [zoekTerm, zetZoekTerm] = useState('');
  const [geselecteerdeAuto, zetGeselecteerdeAuto] = useState(null);
  const [toonModal, zetToonModal] = useState(false);
  const [opmerking, zetOpmerking] = useState('');

  const registreerUitgifte = (auto) => {
    zetGeselecteerdeAuto(auto);
    zetToonModal(true);
  };

  const opslaanUitgifte = () => {
    console.log(`Auto: ${geselecteerdeAuto.naam}`);
    console.log(`Opmerking: ${opmerking ? opmerking : 'Geen opmerking'}`);
    zetToonModal(false);
    zetGeselecteerdeAuto(null);
    zetOpmerking('');
  };

  // Filter auto's op basis van de zoekterm
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
        <h1 className="pagina-titel text-center my-5">Beschikbare Auto's voor Uitgifte</h1>

        {/* Zoekveld */}
        <FormControl
          type="text"
          placeholder="Zoek op naam, adres of andere velden..."
          className="my-3 tabel"
          value={zoekTerm}
          onChange={(e) => zetZoekTerm(e.target.value)}
        />

        {/* Voeg een container toe rondom de tabel */}
        <div className="tabel-container">
          <Table striped bordered hover className="tabel my-5">
            <thead>
              <tr>
                <th>Voornaam</th>
                <th>Achternaam</th>
                <th>Adres</th>
                <th>Rijbewijsnummer</th>
                <th>Aard van rit</th>
                <th>Verste bestemming</th>
                <th>Verwachte kilometers</th>
                <th>Registreer uitgifte</th>
              </tr>
            </thead>
            <tbody>
              {gefilterdeAutos.map((auto) => (
                <tr key={auto.id}>
                  <td>{auto.voorNaam}</td>
                  <td>{auto.achterNaam}</td>
                  <td>{auto.adres}</td>
                  <td>{auto.rijbewijsNummer}</td>
                  <td>{auto.aardVanRit}</td>
                  <td>{auto.versteBestemming}</td>
                  <td>{auto.verwachteKilometers}</td>
                  <td>
                    <Button className="knop" onClick={() => registreerUitgifte(auto)}>⚙️</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

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
