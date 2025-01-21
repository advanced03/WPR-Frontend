import React, { useState } from 'react';
import { Container, Table, Button, Modal, Form, Dropdown, DropdownButton, InputGroup, FormControl } from 'react-bootstrap';
import BoNavbar from "../components/BoNavbar"

const BOWagenparkBeheer = () => {
  const [vehicles, setVehicles] = useState([
    {
      merk: 'Tesla',
      type: 'Model 3',
      kleur: 'Zwart',
      bouwjaar: 2021,
      kenteken: 'AB-123-CD',
      status: 'Beschikbaar',
    },
    {
      merk: 'Volkswagen',
      type: 'Golf',
      kleur: 'Blauw',
      bouwjaar: 2019,
      kenteken: 'EF-456-GH',
      status: 'Beschikbaar',
    },
    {
      merk: 'BMW',
      type: 'X5',
      kleur: 'Wit',
      bouwjaar: 2020,
      kenteken: 'IJ-789-KL',
      status: 'Niet Beschikbaar',
    },
  ]);
  const [toonModal, setModal] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [form, setForm] = useState({
    merk: '',
    type: '',
    kleur: '',
    bouwjaar: '',
    kenteken: '',
    status: 'Beschikbaar',
  });
  const [statusFilter, setStatusFilter] = useState('Alle');
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateVehicle = () => {
    if (currentVehicle !== null) {
      const updatedVehicles = vehicles.map((v, idx) =>
        idx === currentVehicle ? { ...form } : v
      );
      setVehicles(updatedVehicles);
    } else {
      setVehicles([...vehicles, form]);
    }
    setForm({ merk: '', type: '', kleur: '', bouwjaar: '', kenteken: '', status: 'Beschikbaar' });
    setCurrentVehicle(null);
    setModal(false);
  };

  const handleEditVehicle = (index) => {
    setCurrentVehicle(index);
    setForm(vehicles[index]);
    setModal(true);
  };

  const handleDeleteVehicle = () => {
    setVehicles(vehicles.filter((_, idx) => idx !== deleteIndex));
    setDeleteIndex(null);
    setShowDeleteModal(false);
  };

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

  const handleFilterChange = (status) => {
    setStatusFilter(status);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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

        {/* Filter en zoekbalk boven de tabel */}
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

        {/* Tabel met voertuigen */}
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
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEditVehicle(index)}
                    className="me-2"
                  >
                    Wijzigen
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setDeleteIndex(index);
                      setShowDeleteModal(true);
                    }}
                    className="me-2"
                  >
                    Verwijderen
                  </Button>
                  {vehicle.status === 'Beschikbaar' ? (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleBlockVehicle(index)}
                    >
                      Blokkeren
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleUnblockVehicle(index)}
                    >
                      Deblokkeren
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Toevoegen/Wijzigen Modal */}
        <Modal show={toonModal} onHide={() => setModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{currentVehicle !== null ? 'Voertuig Wijzigen' : 'Voertuig Toevoegen'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Merk</Form.Label>
                <Form.Control
                  type="text"
                  name="merk"
                  value={form.merk}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  type="text"
                  name="type"
                  value={form.type}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Kleur</Form.Label>
                <Form.Control
                  type="text"
                  name="kleur"
                  value={form.kleur}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Bouwjaar</Form.Label>
                <Form.Control
                  type="number"
                  name="bouwjaar"
                  value={form.bouwjaar}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Kenteken</Form.Label>
                <Form.Control
                  type="text"
                  name="kenteken"
                  value={form.kenteken}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setModal(false)}>
              Annuleren
            </Button>
            <Button variant="success" onClick={handleAddOrUpdateVehicle}>
              {currentVehicle !== null ? 'Wijzigen' : 'Toevoegen'}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Verwijderbevestiging Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Bevestig Verwijdering</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Weet u zeker dat u dit voertuig wilt verwijderen?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Annuleren
            </Button>
            <Button variant="danger" onClick={handleDeleteVehicle}>
              Verwijderen
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default BOWagenparkBeheer;
