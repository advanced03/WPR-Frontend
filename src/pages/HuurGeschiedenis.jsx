import React, { useState } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import "../style/tabel.css";
import PartNavbar from "../components/PartNavbar.jsx";

const HuurGeschiedenis = () => {
  // State voor huurdata, modaal weergave en geselecteerde index
  const [huurData, setHuurData] = useState([]);
  const [toonModal, setModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Kleurcodes voor verschillende huurstatussen
  const statusKleur = {
    Goedgekeurd: "green",
    Afgekeurd: "red",
    "In Behandeling": "gray",
  };

  // Sorteer huurdata op einddatum (aflopend)
  const sortedHuurData = [...huurData].sort(
    (a, b) => new Date(b.einddatum) - new Date(a.einddatum)
  );

  // Toon annuleringsmodaal
  const handletoonModal = (index) => {
    setSelectedIndex(index);
    setModal(true);
  };

  // Huurverzoek annuleren
  const handleAnnuleren = () => {
    const nieuweHuurData = [...huurData];
    nieuweHuurData[selectedIndex].status = "Geannuleerd";
    setHuurData(nieuweHuurData);
    setModal(false);
  };

  // Sluit het annuleringsmodaal
  const handleCloseModal = () => {
    setModal(false);
    setSelectedIndex(null);
  };

  return (
    <div className="achtergrond2">
      <PartNavbar />
      <Container className="mt-4">
        <h2 className="pagina-titel text-center my-4">Mijn Huurgeschiedenis</h2>
        <Table striped bordered hover className="tabel mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Merk</th>
              <th>Model</th>
              <th>Kleur</th>
              <th>Startdatum</th>
              <th>Einddatum</th>
              <th>Prijs</th>
              <th>Status</th>
              <th>Actie</th>
            </tr>
          </thead>
          <tbody>
            {sortedHuurData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.merk}</td>
                <td>{item.model}</td>
                <td>{item.kleur}</td>
                <td>{item.startdatum}</td>
                <td>{item.einddatum}</td>
                <td>€{item.prijs}</td>
                <td style={{ color: statusKleur[item.status] }}>
                  {item.status}
                </td>
                <td>
                  {item.status !== "Afgekeurd" && item.status !== "Geannuleerd" && (
                    <Button
                      className="knop"
                      onClick={() => handletoonModal(index)}
                    >
                      Annuleren
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Modaal layout ui */}
      <Modal show={toonModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Bevestiging Annuleren</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Weet je zeker dat je dit huurverzoek wilt annuleren?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annuleren
          </Button>
          <Button variant="danger" onClick={handleAnnuleren}>
            Bevestigen
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HuurGeschiedenis;
