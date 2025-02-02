import React, { useState } from 'react';
import { Container, Table, Dropdown, DropdownButton, InputGroup, FormControl } from 'react-bootstrap';
import WbNavbar from "../components/WbNavbar.jsx";

const WbStatus = () => {
  // States initialiseren voor voertuigen filter status zoekopdracht etc.
  const [vehicles, setVehicles] = useState([]);
  const [statusFilter, setStatusFilter] = useState('Alle');
  const [searchQuery, setSearchQuery] = useState('');

  // Verandert het filter op basis van de geselecteerde status
  const handleFilterChange = (status) => {
    setStatusFilter(status);
  };

  // Verandert de zoekterm bij het typen in de zoekbalk
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtert de voertuigen op basis van status en zoekterm
  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesStatus =
      statusFilter === 'Alle' ||
      (statusFilter === 'Verhuurd' && vehicle.status === 'Verhuurd') ||
      (statusFilter === 'Niet Verhuurd' && vehicle.status === 'Niet Verhuurd');
    const matchesSearch =
      vehicle.merk.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.huurder.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="achtergrond2">
      <WbNavbar />
      <Container>
        <h1 className="pagina-titel text-center my-5">Overzicht Wagenpark</h1>

        {/* Zoekbalk */}
        <div className="d-flex justify-content-between mb-3">
          <InputGroup className="w-50">
            <FormControl
              placeholder="Zoek op merk, type of huurder..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </InputGroup>

          <DropdownButton
            variant="secondary"
            title={statusFilter === 'Alle' ? 'Alle Voertuigen' : statusFilter}
            onSelect={handleFilterChange}
          >
            <Dropdown.Item eventKey="Alle">Alle Voertuigen</Dropdown.Item>
            <Dropdown.Item eventKey="Verhuurd">Alleen Verhuurd</Dropdown.Item>
            <Dropdown.Item eventKey="Niet Verhuurd">Alleen Niet Verhuurd</Dropdown.Item>
          </DropdownButton>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Merk</th>
              <th>Type</th>
              <th>Huurder</th>
              <th>Huurdatum</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((vehicle, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{vehicle.merk}</td>
                <td>{vehicle.type}</td>
                <td>{vehicle.huurder}</td>
                <td>{vehicle.huurDatum}</td>
                <td>{vehicle.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default WbStatus;
