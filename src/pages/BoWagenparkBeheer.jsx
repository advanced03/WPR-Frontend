import React, { useState } from 'react';
import { Container, Table, Button, Modal, Form, Dropdown, DropdownButton, InputGroup, FormControl } from 'react-bootstrap';
import BoNavbar from "../components/BoNavbar"

const BOWagenparkBeheer = () => {
  // State voor voertuigen, modals en filters
  const [vehicles, setVehicles] = useState([]);
  const [toonModal, setModal] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null); // Huidig voertuig voor bewerken
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null); // Index van voertuig dat verwijderd wordt
  const [form, setForm] = useState({
    merk: '',
    type: '',
    kleur: '',
    bouwjaar: '',
    kenteken: '',
    status: 'Beschikbaar', // Standaardstatus voor nieuwe voertuigen
  });
  const [statusFilter, setStatusFilter] = useState('Alle'); // Filter voor status (alle/actief/geblokkeerd)
  const [searchQuery, setSearchQuery] = useState(''); // Zoekterm voor voertuigen

  // Methode voor wijzigen van formulierwaarden
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Toevoegen of updaten van een voertuig
  const handleAddOrUpdateVehicle = () => {
    if (currentVehicle !== null) {
      // Updaten van een bestaand voertuig
      const updatedVehicles = vehicles.map((v, idx) =>
        idx === currentVehicle ? { ...form } : v
      );
      setVehicles(updatedVehicles);
    } else {
      // Nieuw voertuig toevoegen
      setVehicles([...vehicles, form]);
    }
    setForm({ merk: '', type: '', kleur: '', bouwjaar: '', kenteken: '', status: 'Beschikbaar' });
    setCurrentVehicle(null);
    setModal(false);
  };

  // Bewerken van een bestaand voertuig
  const handleEditVehicle = (index) => {
    setCurrentVehicle(index);
    setForm(vehicles[index]);
    setModal(true);
  };

  // Verwijderen van een voertuig
  const handleDeleteVehicle = () => {
    setVehicles(vehicles.filter((_, idx) => idx !== deleteIndex));
    setDeleteIndex(null);
    setShowDeleteModal(false);
  };

  // Blokkeren of deblokkeren van een voertuig
  const handleBlockVehicle = (index) => {
    const updatedVehicles = vehicles.map((v, idx) =>
      idx === index ? { ...v, status: 'Niet Beschikbaar' } : v
    );
    setVehicles(updatedVehicles);
  };

  const handleUnblockVehicle = (index) => {
    const updatedVehicles = vehicles.map((v, idx) =>
      idx === index ? { ...v, status: 'Beschikbaar' } : v
    );
    setVehicles(updatedVehicles);
  };

  // Filters en zoekfunctionaliteit
  const handleFilterChange = (status) => setStatusFilter(status);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  // Filteren en zoeken in voertuigenlijst
  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesStatus =
      statusFilter === 'Alle' ||
      (statusFilter === 'Actief' && vehicle.status === 'Beschikbaar') ||
      (statusFilter === 'Geblokkeerd' && vehicle.status === 'Niet Beschikbaar');
    const matchesSearch =
      vehicle.merk.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.kleur.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.kenteken.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="achtergrond2">
      <BoNavbar />
      <Container>
        <h1 className="pagina-titel text-center my-4">Wagenparkbeheer</h1>

        {/* Filter en zoekbalk */}
        <div className="d-flex justify-content-between mb-3">
          <InputGroup className="w-50">
            <FormControl
              placeholder="Zoek voertuigen..."
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
            <Dropdown.Item eventKey="Actief">Alleen Actief</Dropdown.Item>
            <Dropdown.Item eventKey="Geblokkeerd">Alleen Geblokkeerd</Dropdown.Item>
          </DropdownButton>
          <Button className="mb-3 knop" onClick={() => setModal(true)}>
            Voertuig Toevoegen
          </Button>
        </div>
        
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Merk</th>
              <th>Type</th>
              <th>Kleur</th>
              <th>Bouwjaar</th>
              <th>Kenteken</th>
              <th>Status</th>
              <th>Acties</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((vehicle, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{vehicle.merk}</td>
                <td>{vehicle.type}</td>
                <td>{vehicle.kleur}</td>
                <td>{vehicle.bouwjaar}</td>
                <td>{vehicle.kenteken}</td>
                <td>{vehicle.status}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEditVehicle(index)} className="me-2">
                    Wijzigen
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => {
                    setDeleteIndex(index);
                    setShowDeleteModal(true);
                  }} className="me-2">
                    Verwijderen
                  </Button>
                  {vehicle.status === 'Beschikbaar' ? (
                    <Button variant="secondary" size="sm" onClick={() => handleBlockVehicle(index)}>
                      Blokkeren
                    </Button>
                  ) : (
                    <Button variant="success" size="sm" onClick={() => handleUnblockVehicle(index)}>
                      Deblokkeren
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

export default BOWagenparkBeheer;
