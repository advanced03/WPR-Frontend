import React, { useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import "../style/tabel.css";

const HuurGeschiedenis = () => {
  const [huurData, setHuurData] = useState([
    {
      merk: "Volkswagen",
      model: "Golf",
      kleur: "Blauw",
      startdatum: "01-12-2024",
      einddatum: "10-12-2024",
      prijs: 250,
      status: "In Behandeling",
    },
    {
      merk: "BMW",
      model: "X5",
      kleur: "Zwart",
      startdatum: "12-08-2024",
      einddatum: "19-08-2024",
      prijs: 500,
      status: "Goedgekeurd",
    },
    {
      merk: "Mercedes",
      model: "Sprinter",
      kleur: "Wit",
      startdatum: "05-10-2024",
      einddatum: "15-10-2024",
      prijs: 450,
      status: "Goedgekeurd",
    },
    {
      merk: "Audi",
      model: "A3",
      kleur: "Rood",
      startdatum: "10-07-2024",
      einddatum: "18-07-2024",
      prijs: 300,
      status: "Goedgekeurd",
    },
    {
      merk: "Peugeot",
      model: "208",
      kleur: "Grijs",
      startdatum: "18-04-2024",
      einddatum: "25-04-2024",
      prijs: 240,
      status: "Afgekeurd",
    },
  ]);

  const statusKleur = {
    Goedgekeurd: "green",
    Afgekeurd: "red",
    "In Behandeling": "gray",
  };

  // Huurdata sorteren
  const sortedHuurData = [...huurData].sort((a, b) => new Date(b.einddatum) - new Date(a.einddatum));

  const handleAnnuleren = (index) => {
    const bevestigen = window.confirm("Weet je zeker dat je dit huurverzoek wilt annuleren?");
    if (bevestigen) {
      const nieuweHuurData = [...huurData];
      nieuweHuurData[index].status = "Geannuleerd";
      setHuurData(nieuweHuurData);
    }
  };

  return (
    <div className="achtergrond2">
      <Container className="mt-4">
        <h2 className="huren-titel text-center my-4">Mijn Huurgeschiedenis</h2>
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
                      variant="danger"
                      onClick={() => handleAnnuleren(index)}
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
    </div>
  );
};

export default HuurGeschiedenis;
