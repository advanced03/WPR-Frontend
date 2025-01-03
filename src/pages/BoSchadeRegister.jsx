import React, { useState } from 'react';
import { Container, Table, Button, Modal, Form, InputGroup, FormControl, Dropdown, DropdownButton, Row, Col, Card } from 'react-bootstrap';

const BOWagenparkBeheer = () => {
  const [vehicles, setVehicles] = useState([
    {
      merk: 'Tesla',
      type: 'Model 3',
      kleur: 'Zwart',
      bouwjaar: 2021,
      kenteken: 'AB-123-CD',
      status: 'Beschikbaar',
      schade: 'Geen schade',
      registratieDatum: '2024-12-01',
    },
    {
      merk: 'Volkswagen',
      type: 'Golf',
      kleur: 'Blauw',
      bouwjaar: 2019,
      kenteken: 'EF-456-GH',
      status: 'Beschikbaar',
      schade: 'Gebroken achterlicht',
      registratieDatum: '2024-12-10',
    },
    {
      merk: 'BMW',
      type: 'X5',
      kleur: 'Wit',
      bouwjaar: 2020,
      kenteken: 'IJ-789-KL',
      status: 'Niet Beschikbaar',
      schade: 'Deuk in zijpaneel',
      registratieDatum: '2024-12-15',
    },
  ]);

  const [form, setForm] = useState({
    merk: '',
    type: '',
    kleur: '',
    bouwjaar: '',
    kenteken: '',
    status: 'Beschikbaar',
    schade: '',
    registratieDatum: '',
  });
  const [statusFilter, setStatusFilter] = useState('Alle');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRepairModal, setShowRepairModal] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

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
    setForm({ merk: '', type: '', kleur: '', bouwjaar: '', kenteken: '', status: 'Beschikbaar', schade: '', registratieDatum: '' });
    setCurrentVehicle(null);
    setShowModal(false);
  };

  const handleEditVehicle = (index) => {
    setCurrentVehicle(index);
    setForm(vehicles[index]);
    setShowModal(true);
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

  const handleRegisterForRepair = (vehicle) => {
    setCurrentVehicle(vehicle);
    setShowRepairModal(true);
  };

  const handleConfirmRepair = () => {
    const updatedVehicles = vehicles.map((v) =>
      v.kenteken === currentVehicle.kenteken
        ? { ...v, status: 'In reparatie' }
        : v
    );
    setVehicles(updatedVehicles);
    setShowRepairModal(false);
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
      <Container>
        <h1 className="pagina-titel text-center my-4">Wagenparkbeheer</h1>

        {/* Filter en zoekbalk boven de tabel */}
        <Row className="mb-4">
          <Col md={6}>
            <InputGroup className="w-100">
              <FormControl
                placeholder="Zoek voertuigen..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </InputGroup>
          </Col>

          <Col md={3}>
            <DropdownButton
              title={statusFilter === 'Alle' ? 'Alle Voertuigen' : statusFilter}
              onSelect={handleFilterChange}
              className="w-100 knop"
            >
              <Dropdown.Item eventKey="Alle">Alle Voertuigen</Dropdown.Item>
              <Dropdown.Item eventKey="Actief">Alleen Actief</Dropdown.Item>
              <Dropdown.Item eventKey="Geblokkeerd">Alleen Geblokkeerd</Dropdown.Item>
            </DropdownButton>
          </Col>

          <Col md={3}>
            <Button className="w-100" onClick={() => setShowModal(true)}>
              Voertuig Toevoegen
            </Button>
          </Col>
        </Row>

        {/* Tabel met voertuigen */}
        <Row>
          {filteredVehicles.map((vehicle, index) => (
            <Col key={index} md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{vehicle.merk} {vehicle.type}</Card.Title>
                  <Card.Text>
                    <strong>Kenteken:</strong> {vehicle.kenteken}<br />
                    <strong>Status:</strong> {vehicle.status}<br />
                    <strong>Schade:</strong> {vehicle.schade}
                  </Card.Text>
                  <Button
                    variant="primary"
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
                  >
                    Verwijderen
                  </Button>
                  {vehicle.status === 'Beschikbaar' ? (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleBlockVehicle(index)}
                      className="mt-2"
                    >
                      Blokkeren
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleUnblockVehicle(index)}
                      className="mt-2"
                    >
                      Deblokkeren
                    </Button>
                  )}
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleRegisterForRepair(vehicle)}
                    className="mt-2"
                  >
                    Schadebeheer
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Toevoegen/Wijzigen Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
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
              <Form.Group className="mb-3">
                <Form.Label>Schade</Form.Label>
                <Form.Control
                  type="text"
                  name="schade"
                  value={form.schade}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Registratiedatum</Form.Label>
                <Form.Control
                  type="date"
                  name="registratieDatum"
                  value={form.registratieDatum}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Annuleren
            </Button>
            <Button variant="primary" onClick={handleAddOrUpdateVehicle}>
              {currentVehicle !== null ? 'Opslaan' : 'Toevoegen'}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Bevestiging Schade Modal */}
        <Modal show={showRepairModal} onHide={() => setShowRepairModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Schade Informatie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Wilt u het voertuig {currentVehicle?.merk} {currentVehicle?.type} met kenteken{' '}
              {currentVehicle?.kenteken} markeren als "In reparatie"?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowRepairModal(false)}>
              Annuleren
            </Button>
            <Button variant="primary" onClick={handleConfirmRepair}>
              Bevestigen
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Bevestiging Verwijder Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Verwijder Voertuig</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Bent u zeker dat u het voertuig met kenteken {vehicles[deleteIndex]?.kenteken} wilt
              verwijderen?
            </p>
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
