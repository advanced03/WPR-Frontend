import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import axios from "axios";
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
    (a, b) => new Date(b.eindDatum) - new Date(a.eindDatum)
  );

  // Toon annuleringsmodaal
  const handletoonModal = (index) => {
    setSelectedIndex(index);
    setModal(true);
  };

  // Sluit het annuleringsmodaal
  const handleCloseModal = () => {
    setModal(false);
    setSelectedIndex(null);
  };

  // Haal de huurdata op van de API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          console.error("Geen JWT-token gevonden.");
          return;
        }

          const response = await axios.get("https://localhost:7281//api/Reserveringen/ViewHuurGeschiedenis", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(response.data)) {
          setHuurData(response.data);
        } else {
          console.error("Data is geen array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching huur data:", error);
      }
    };

    fetchData();
  }, []);

  // Huurverzoek annuleren
  const handleAnnuleren = async () => {
    const verhuurVerzoekId = huurData[selectedIndex].verhuurVerzoekId;
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("Geen JWT-token gevonden.");
        return;
      }

      // Gebruik PUT in plaats van DELETE
      const response = await axios.put(
        `https://localhost:7281/api/verhuurVerzoek/DeclineMyVerzoek/${verhuurVerzoekId}`,
        {}, // Als je geen body nodig hebt, kun je dit leeg laten
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        const updatedData = [...huurData];
        updatedData[selectedIndex].status = "Geannuleerd";
        setHuurData(updatedData);
        setModal(false);
      } else {
        console.error("Fout bij het annuleren van het verzoek:", response);
      }
    } catch (error) {
      console.error("Error annuleringsverzoek:", error);
      // Foutmelding die meer informatie geeft
      if (error.response) {
        console.error("Server Response Error:", error.response);
      } else if (error.request) {
        console.error("Request Error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
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
              <th>Aard Reis</th>
              <th>Bestemming</th>
              <th>Verwachte KM</th>
              <th>Startdatum</th>
              <th>Einddatum</th>
              <th>Status</th>
              <th>Actie</th>
            </tr>
          </thead>
          <tbody>
            {sortedHuurData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.aardReis}</td>
                <td>{item.bestemming}</td>
                <td>{item.verwachtteKM}</td>
                <td>{new Date(item.startDatum).toLocaleDateString()}</td>
                <td>{new Date(item.eindDatum).toLocaleDateString()}</td>
                <td style={{ color: statusKleur[item.status] }}>
                  {item.status}
                </td>
                <td>
                  {item.status === "Pending" && (
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
