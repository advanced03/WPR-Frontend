import React from "react";
import { Container, Table } from "react-bootstrap";
import "../style/huurgeschiedenis.css";

const HuurGeschiedenis = () => {
  // Mock data met extra velden
  const huurData = [
    {
      merk: "Volkswagen",
      model: "Golf",
      kleur: "Blauw",
      periode: "01-12-2024 t/m 10-12-2024",
      prijs: 250,
      status: "Goedgekeurd",
    },
    {
      merk: "Mercedes",
      model: "Sprinter",
      kleur: "Wit",
      periode: "05-10-2024 t/m 15-10-2024",
      prijs: 450,
      status: "Afgekeurd",
    },
    {
      merk: "BMW",
      model: "X5",
      kleur: "Zwart",
      periode: "12-08-2024 t/m 19-08-2024",
      prijs: 500,
      status: "In Behandeling",
    },
    {
      merk: "Audi",
      model: "A3",
      kleur: "Rood",
      periode: "10-07-2024 t/m 18-07-2024",
      prijs: 300,
      status: "Goedgekeurd",
    },
    {
      merk: "Opel",
      model: "Corsa",
      kleur: "Groen",
      periode: "21-06-2024 t/m 28-06-2024",
      prijs: 200,
      status: "Afgekeurd",
    },
    {
      merk: "Ford",
      model: "Fiesta",
      kleur: "Geel",
      periode: "01-05-2024 t/m 10-05-2024",
      prijs: 220,
      status: "Goedgekeurd",
    },
    {
      merk: "Peugeot",
      model: "208",
      kleur: "Grijs",
      periode: "18-04-2024 t/m 25-04-2024",
      prijs: 240,
      status: "In Behandeling",
    },
    {
      merk: "Renault",
      model: "Clio",
      kleur: "Wit",
      periode: "03-03-2024 t/m 10-03-2024",
      prijs: 210,
      status: "Goedgekeurd",
    },
    {
      merk: "Tesla",
      model: "Model 3",
      kleur: "Zilver",
      periode: "12-02-2024 t/m 20-02-2024",
      prijs: 600,
      status: "Afgekeurd",
    },
    {
      merk: "Mazda",
      model: "CX-5",
      kleur: "Blauw",
      periode: "25-01-2024 t/m 01-02-2024",
      prijs: 350,
      status: "In Behandeling",
    },
    {
      merk: "Nissan",
      model: "Qashqai",
      kleur: "Zwart",
      periode: "10-12-2023 t/m 17-12-2023",
      prijs: 330,
      status: "Goedgekeurd",
    },
    {
      merk: "Honda",
      model: "Civic",
      kleur: "Rood",
      periode: "05-11-2023 t/m 12-11-2023",
      prijs: 280,
      status: "Afgekeurd",
    },
    {
      merk: "Hyundai",
      model: "Ioniq",
      kleur: "Grijs",
      periode: "20-10-2023 t/m 27-10-2023",
      prijs: 320,
      status: "Goedgekeurd",
    },
    {
      merk: "Kia",
      model: "Sportage",
      kleur: "Oranje",
      periode: "15-09-2023 t/m 22-09-2023",
      prijs: 360,
      status: "In Behandeling",
    },
    {
      merk: "Fiat",
      model: "Panda",
      kleur: "Zilver",
      periode: "30-08-2023 t/m 06-09-2023",
      prijs: 180,
      status: "Goedgekeurd",
    },
    {
      merk: "Volvo",
      model: "XC60",
      kleur: "Blauw",
      periode: "12-07-2023 t/m 19-07-2023",
      prijs: 550,
      status: "Afgekeurd",
    },
    {
      merk: "Jeep",
      model: "Cherokee",
      kleur: "Rood",
      periode: "25-06-2023 t/m 02-07-2023",
      prijs: 490,
      status: "Goedgekeurd",
    },
    {
      merk: "Mazda",
      model: "MX-5",
      kleur: "Zwart",
      periode: "10-05-2023 t/m 17-05-2023",
      prijs: 350,
      status: "In Behandeling",
    },
    {
      merk: "Land Rover",
      model: "Discovery",
      kleur: "Grijs",
      periode: "01-04-2023 t/m 08-04-2023",
      prijs: 600,
      status: "Goedgekeurd",
    },
    {
      merk: "Subaru",
      model: "Forester",
      kleur: "Groen",
      periode: "10-03-2023 t/m 17-03-2023",
      prijs: 420,
      status: "Afgekeurd",
    },
  ];

  const statusKleur = {
    Goedgekeurd: "green",
    Afgekeurd: "red",
    "In Behandeling": "graqy",
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
              <th>Huurperiode</th>
              <th>Prijs</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {huurData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.merk}</td>
                <td>{item.model}</td>
                <td>{item.kleur}</td>
                <td>{item.periode}</td>
                <td>€{item.prijs}</td>
                <td style={{ color: statusKleur[item.status] }}>
                  {item.status}
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
