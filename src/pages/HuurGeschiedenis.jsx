// State variabelen
import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";
import "../style/tabel.css";
import PartNavbar from "../components/PartNavbar.jsx";

const HuurGeschiedenis = () => {
  // State voor huurdata
  const [huurData, setHuurData] = useState([]);

  // Sorteer huurdata op einddatum (aflopend)
  const sortedHuurData = [...huurData].sort(
    (a, b) => new Date(b.eindDatum) - new Date(a.eindDatum)
  );

  // Haal de huurdata op van de API
  useEffect(() => {
    // Functie om data op te halen
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("jwtToken");
        if (!token) {
          console.error("Geen JWT-token gevonden.");
          return;
        }

        const response = await axios.get(
          "https://localhost:7281/api/Reserveringen/ViewHuurGeschiedenis",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Als er geen huurverzoeken zijn gevonden, geef een alert en leeg de huurData array
        if (response.status === 404) {
          alert("Er zijn geen huurverzoeken gevonden");
          setHuurData([]);
        } else if (Array.isArray(response.data)) {
          setHuurData(response.data);
        } else {
          console.error("Data is geen array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching huur data:", error);
      }
    };
 // Voer de fetchData functie uit
    fetchData();
  }, []);

  return (
    <div className="achtergrond2">
      <PartNavbar />
      <Container className="mt-4">
        <h2 className="pagina-titel text-center my-4">Mijn Huurgeschiedenis</h2>
        <Table striped bordered hover className="tabel mt-5">
          <thead>
            <tr>
              <th>Aard van de reis:</th>
              <th>Bestemming:</th>
              <th>Verwachte afstand:</th>
              <th>Van:</th>
              <th>Tot:</th>
              <th>Verzekering:</th>
              <th>Accessoires:</th>
            </tr>
          </thead>
          <tbody>
            {/* Als er huurdata is, map over de data en geef de data weer in de tabel */}
            {sortedHuurData.length > 0 ? (
              sortedHuurData.map((item, index) => (
                <tr key={index}>
                  <td>{item.aardReis}</td>
                  <td>{item.bestemming}</td>
                  <td>{item.verwachtteKM} KM</td>
                  <td>{new Date(item.startDatum).toLocaleDateString()}</td>
                  <td>{new Date(item.eindDatum).toLocaleDateString()}</td>
                  <td>{item.verzekering}</td>
                  <td>{item.accessoires.length > 0 ? item.accessoires.map((acc) => acc.naam).join(", ") : "Geen accessoires"}</td>
                </tr>
              ))
            ) : ( // Als er geen huurdata is, geef een melding in de tabel
              <tr>
                <td colSpan="5" className="text-center">
                  Geen afgeronden huurverzoeken gevonden.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default HuurGeschiedenis;
