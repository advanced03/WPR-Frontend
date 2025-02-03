import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal, Alert } from "react-bootstrap";
import axios from "axios";
import "../style/tabel.css";
import PartNavbar from "../components/PartNavbar.jsx";

const PendingVerzoek = () => {
  // State voor de pending verhuur verzoeken
  const [pendingData, setPendingData] = useState([]);

  // State voor de modal
  const [showModal, setShowModal] = useState(false);
  const [selectedVerhuurId, setSelectedVerhuurId] = useState(null);

  // State voor de alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

  // Haal de pending verhuur verzoeken op van de API
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
          setPendingData([]); // Leeg de pendingData array
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

  // Functie om een verzoek te annuleren
  const declineVerzoek = async () => {
    try {
      const token = sessionStorage.getItem("jwtToken");
      if (!token) {
        console.error("Geen JWT-token gevonden.");
        return;
      }

      const response = await axios.put(
        `https://localhost:7281/api/verhuurVerzoek/DeclineMyVerzoek/${selectedVerhuurId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setAlertMessage("Verzoek geannuleerd.");
        setAlertVariant("success");
        setShowAlert(true);
        setPendingData((prevData) =>
          prevData.filter((item) => item.verhuurverzoekId !== selectedVerhuurId)
        );
      } else {
        setAlertMessage("Fout bij het annuleren van het verzoek.");
        setAlertVariant("danger");
        setShowAlert(true);
      }
      setShowModal(false); // Sluit de modal na het annuleren
    } catch (error) {
      console.error("Error declining verhuurverzoek:", error);
      setAlertMessage("Er is een fout opgetreden.");
      setAlertVariant("danger");
      setShowAlert(true);
      setShowModal(false); // Sluit de modal als er een fout is
    }
  };

  // Functie om de modal te tonen en het juiste verzoek te selecteren
  const handleShowModal = (verhuurverzoekId) => {
    setSelectedVerhuurId(verhuurverzoekId);
    setShowModal(true);
  };

  // Functie om de modal te sluiten
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="achtergrond2">
      <PartNavbar />
      <Container className="mt-4">
        <h2 className="pagina-titel text-center my-4">Pending Verhuurverzoeken</h2>
        
        {/* React Bootstrap Alert */}
        {showAlert && (
          <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
            {alertMessage}
          </Alert>
        )}

        <Table striped bordered hover className="tabel mt-5">
          <thead>
            <tr>
              <th>Aard reis:</th>
              <th>Uw bestemming:</th>
              <th>Verwachte afstand:</th>
              <th>Voertuig:</th> {/* Combinerende kolom */}
              <th>Soort:</th>
              <th>Van:</th>
              <th>Tot:</th>
              <th>Annuleren</th>
            </tr>
          </thead>
          <tbody>
            {pendingData.length > 0 ? (
              pendingData.map((item) => (
                <tr key={item.verhuurverzoekId}>
                  <td>{item.aardReis}</td>
                  <td>{item.bestemming}</td>
                  <td>{item.verwachtteKM}</td>
                  <td>{`${item.voertuigMerk} ${item.voertuigType}`}</td> {/* Samengevoegde voertuiginformatie */}
                  <td>{item.voertuigSoort}</td>
                  <td>{new Date(item.startDatum).toLocaleDateString()}</td>
                  <td>{new Date(item.eindDatum).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleShowModal(item.verhuurverzoekId)}
                    >
                      🗑️
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  Geen openstaande verhuurverzoeken gevonden.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>

      {/* Modal voor bevestiging */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Bevestig Annuleren</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Weet je zeker dat je dit verhuurverzoek wilt annuleren?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annuleren
          </Button>
          <Button variant="danger" onClick={declineVerzoek}>
            Ja, Annuleren
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PendingVerzoek;
