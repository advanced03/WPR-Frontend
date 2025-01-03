import React, { useState } from 'react';
import { Container, Table, Button, Modal, FormControl } from 'react-bootstrap';

const BoSchadeRegister = () => {
  const [autos, zetAutos] = useState([
    { id: 1, merk: 'Toyota', model: 'Corolla', kenteken: 'AB-123-CD', kleur: 'Rood', aanschafjaar: 2018, status: 'Beschikbaar' },
    { id: 2, merk: 'Volkswagen', model: 'Golf', kenteken: 'EF-456-GH', kleur: 'Blauw', aanschafjaar: 2020, status: 'Beschikbaar' },
    { id: 3, merk: 'Ford', model: 'Fiesta', kenteken: 'IJ-789-KL', kleur: 'Wit', aanschafjaar: 2019, status: 'Beschikbaar' },
    { id: 4, merk: 'BMW', model: 'X5', kenteken: 'MN-012-OP', kleur: 'Zwart', aanschafjaar: 2021, status: 'Beschikbaar' },
    { id: 5, merk: 'Audi', model: 'A3', kenteken: 'QR-345-ST', kleur: 'Grijs', aanschafjaar: 2017, status: 'Beschikbaar' },
  ]);

  const [zoekTerm, zetZoekTerm] = useState('');
  const [geselecteerdeAuto, zetGeselecteerdeAuto] = useState(null);
  const [toonModal, zetToonModal] = useState(false);

  const registreerInReparatie = (auto) => {
    zetGeselecteerdeAuto(auto);
    zetToonModal(true);
  };

  const opslaanInReparatie = () => {
    zetAutos((huidigeAutos) =>
      huidigeAutos.map((auto) =>
        auto.id === geselecteerdeAuto.id ? { ...auto, status: 'In reparatie' } : auto
      )
    );
    zetToonModal(false);
    zetGeselecteerdeAuto(null);
  };

  const gefilterdeAutos = autos.filter((auto) =>
    Object.values(auto)
      .join(' ')
      .toLowerCase()
      .includes(zoekTerm.toLowerCase())
  );

  return (
    <div className="achtergrond2">
      <Container fluid>
        <h1 className="pagina-titel text-center my-5">Auto Status Beheer</h1>

        {/* Zoekveld */}
        <FormControl
          type="text"
          placeholder="Zoek op merk, model of kenteken..."
          className="my-3 tabel"
          value={zoekTerm}
          onChange={(e) => zetZoekTerm(e.target.value)}
        />

        <div className="tabel-container">
          <Table striped bordered hover className="tabel my-5">
            <thead>
              <tr>
                <th>Merk</th>
                <th>Model</th>
                <th>Kenteken</th>
                <th>Kleur</th>
                <th>Aanschafjaar</th>
                <th>Status</th>
                <th>Actie</th>
              </tr>
            </thead>
            <tbody>
              {gefilterdeAutos.map((auto) => (
                <tr key={auto.id}>
                  <td>{auto.merk}</td>
                  <td>{auto.model}</td>
                  <td>{auto.kenteken}</td>
                  <td>{auto.kleur}</td>
                  <td>{auto.aanschafjaar}</td>
                  <td>{auto.status}</td>
                  <td>
                    {auto.status !== 'In reparatie' && (
                      <Button className="knop" onClick={() => registreerInReparatie(auto)}>⚙️</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <Modal show={toonModal} onHide={() => zetToonModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Wijzig Voertuigstatus</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Wilt u het voertuig <strong>{geselecteerdeAuto?.merk} {geselecteerdeAuto?.model}</strong> met kenteken <strong>{geselecteerdeAuto?.kenteken}</strong> markeren als "In reparatie"?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => zetToonModal(false)}>
              Annuleren
            </Button>
            <Button variant="success" onClick={opslaanInReparatie}>
              Bevestigen
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default BoSchadeRegister;