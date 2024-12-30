import React, { useState } from 'react';
import { Container, Table, Button, Modal, Form, FormControl } from 'react-bootstrap';

const FoVoertuigInname = () => {
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
  const [schadeInfo, zetSchadeInfo] = useState('');
  const [heeftSchade, zetHeeftSchade] = useState(false);

  const registreerInname = (auto) => {
    zetGeselecteerdeAuto(auto);
    zetToonModal(true);
  };

  const opslaanInname = () => {
    console.log(`Auto: ${geselecteerdeAuto.naam}`);
    console.log(`Schade: ${heeftSchade ? schadeInfo : 'Geen schade'}`);
    zetToonModal(false);
    zetGeselecteerdeAuto(null);
    zetSchadeInfo('');
    zetHeeftSchade(false);
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
<Container fluid>
  <h1 className="pagina-titel text-center my-5">Uitgehuurde Auto's</h1>

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
          <th>Registreer inname</th>
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
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Beschrijf de schade"
              value={schadeInfo}
              onChange={(e) => zetSchadeInfo(e.target.value)}
              className="mt-2"
            />
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
