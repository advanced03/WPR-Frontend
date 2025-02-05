import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal, Alert } from "react-bootstrap";
import axios from "axios";
import "../style/tabel.css";
import PartNavbar from "../components/PartNavbar.jsx";

const PendingVerzoek = () => {
  const [pendingData, setPendingData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVerhuurId, setSelectedVerhuurId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");
  
  // Variabele voor de kosten
  const [kostenOverzicht, setKostenOverzicht] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("jwtToken");
        if (!token) {
          console.error("Geen JWT-token gevonden.");
          return;
        }

        const response = await axios.get(
          "https://localhost:7281/api/verhuurVerzoek/GetAllPendingVerhuurVerzoeken",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 404) {
          alert("Er zijn geen pending verhuurverzoeken gevonden");
          setPendingData([]);
        } else if (Array.isArray(response.data)) {
          setPendingData(response.data);
        } else {
          console.error("Data is geen array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching pending data:", error);
      }
    };

    fetchData();
  }, []);

  const getKostenOverzicht = async (verhuurverzoekId) => {
    console.log("Opgehaald verhuurverzoekId voor kostenoverzicht:", verhuurverzoekId);
    try {
      const token = sessionStorage.getItem("jwtToken");
      if (!token) {
        console.error("Geen JWT-token gevonden.");
        return;
      }

      const response = await axios.put(
        `https://localhost:7281/api/verhuurVerzoek/GetKostenOverzicht`,
        { id: verhuurverzoekId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setKostenOverzicht(response.data);
        setShowModal(true);
      } else {
        setAlertMessage("Fout bij het ophalen van het kostenoverzicht.");
        setAlertVariant("danger");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error fetching kosten overzicht:", error);
      setAlertMessage("Er is een fout opgetreden.");
      setAlertVariant("danger");
      setShowAlert(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setKostenOverzicht(null); // Reset de kosten na sluiten van de modal
  };

  return (
    <div className="achtergrond2">
      <PartNavbar />
      <Container className="mt-4">
        <h2 className="pagina-titel text-center my-4">Openstaande Verhuurverzoeken</h2>

        {showAlert && (
          <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
            {alertMessage}
          </Alert>
        )}

        <Table striped bordered hover className="tabel mt-5">
          <thead>
            <tr>
              <th>Aard van de reis:</th>
              <th>Bestemming:</th>
              <th>Verwachte afstand:</th>
              <th>Voertuig:</th>
              <th>Soort:</th>
              <th>Van:</th>
              <th>Tot:</th>
              <th>Accessoires:</th>
              <th>Verzekering:</th>
              <th>Acties</th>
            </tr>
          </thead>
          <tbody>
            {pendingData.length > 0 ? (
              pendingData.map((item) => (
                <tr key={item.verhuurverzoekId}>
                  <td>{item.aardReis}</td>
                  <td>{item.bestemming}</td>
                  <td>{item.verwachtteKM} KM</td>
                  <td>{`${item.voertuigMerk} ${item.voertuigType}`}</td>
                  <td>{item.voertuigSoort}</td>
                  <td>{new Date(item.startDatum).toLocaleDateString()}</td>
                  <td>{new Date(item.eindDatum).toLocaleDateString()}</td>
                  <td>{item.accessoires.join(", ") || "Geen accessoires"}</td>
                  <td>{item.verzekering}</td>
                  <td>
                    <Button
                      variant="danger"
                      className="ms-1 my-1"
                      onClick={() => handleShowModal(item.verhuurverzoekId)}
                    >
                      🗑️
                    </Button>
                    <Button
                      variant="success"
                      className="ms-1 my-1"
                      onClick={() => getKostenOverzicht(item.verhuurverzoekId)}
                    >
                      💰
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  Geen openstaande verhuurverzoeken gevonden.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>

      {/* Modal voor het tonen van het Kosten Overzicht */}
      {kostenOverzicht && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Kosten Overzicht</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Totaal: € {kostenOverzicht.totalePrijs}</h5>
            <ul>
              {kostenOverzicht.prijsDetails.map((detail, index) => (
                <li key={index}>
                  <strong>{detail.beschrijving}:</strong> € {detail.amount}
                </li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button className="knop" onClick={handleCloseModal}>
              Sluiten
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default PendingVerzoek;
