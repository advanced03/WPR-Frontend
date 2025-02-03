import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";
import "../style/tabel.css";
import PartNavbar from "../components/PartNavbar.jsx";

const HuurGeschiedenis = () => {
  // State voor huurdata
  const [huurData, setHuurData] = useState([]);

  // Kleurcodes voor verschillende huurstatussen
  const statusKleur = {
    Goedgekeurd: "green",
    Afgekeurd: "red",
  };

  // Sorteer huurdata op einddatum (aflopend)
  const sortedHuurData = [...huurData].sort(
    (a, b) => new Date(b.eindDatum) - new Date(a.eindDatum)
  );

  // Haal de huurdata op van de API
  useEffect(() => {
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

        if (response.status === 404) {
          alert("Er zijn geen huurverzoeken gevonden");
          setHuurData([]); // Leeg de huurData array
        } else if (Array.isArray(response.data)) {
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
            </tr>
          </thead>
          <tbody>
            {sortedHuurData.length > 0 ? (
              sortedHuurData.map((item, index) => (
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  Geen huurverzoeken beschikbaar.
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
