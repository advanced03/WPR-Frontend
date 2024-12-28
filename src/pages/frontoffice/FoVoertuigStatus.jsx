import React, { useState } from 'react';
import { Container, Table, Button, Modal, Row, Col, Card, Form } from 'react-bootstrap';
import "./././../../style/tabel.css";

const FoVoertuigStatus = () => {
  // Mock data voor voertuigen, 5 voertuigen per type
  const wagens = [
    // Auto's
    {
      id: '1',
      type: 'Auto',
      brand: 'Volkswagen',
      model: 'Passat',
      color: 'Blauw',
      purchaseYear: '2020',
      hasDamage: 'Ja',
    },
    {
      id: '2',
      type: 'Auto',
      brand: 'Audi',
      model: 'A4',
      color: 'Zwart',
      purchaseYear: '2019',
      hasDamage: 'Nee',
    },
    {
      id: '3',
      type: 'Auto',
      brand: 'BMW',
      model: '3 Serie',
      color: 'Wit',
      purchaseYear: '2021',
      hasDamage: 'Ja',
    },
    {
      id: '4',
      type: 'Auto',
      brand: 'Mercedes-Benz',
      model: 'C-Klasse',
      color: 'Grijs',
      purchaseYear: '2018',
      hasDamage: 'Nee',
    },
    {
      id: '5',
      type: 'Auto',
      brand: 'Peugeot',
      model: '308',
      color: 'Rood',
      purchaseYear: '2022',
      hasDamage: 'Nee',
    },

    // Caravans
    {
      id: '6',
      type: 'Caravan',
      brand: 'Hobby',
      model: 'De Luxe',
      color: 'Wit',
      purchaseYear: '2018',
      hasDamage: 'Nee',
    },
    {
      id: '7',
      type: 'Caravan',
      brand: 'Fendt',
      model: 'Opal',
      color: 'Grijs',
      purchaseYear: '2021',
      hasDamage: 'Ja',
    },
    {
      id: '8',
      type: 'Caravan',
      brand: 'Knaus',
      model: 'Sport',
      color: 'Blauw',
      purchaseYear: '2020',
      hasDamage: 'Ja',
    },
    {
      id: '9',
      type: 'Caravan',
      brand: 'Adria',
      model: 'Altea',
      color: 'Groen',
      purchaseYear: '2019',
      hasDamage: 'Nee',
    },
    {
      id: '10',
      type: 'Caravan',
      brand: 'Tabbert',
      model: 'Puccini',
      color: 'Rood',
      purchaseYear: '2022',
      hasDamage: 'Nee',
    },

    // Campers
    {
      id: '11',
      type: 'Camper',
      brand: 'Mercedes',
      model: 'Sprinter',
      color: 'Grijs',
      purchaseYear: '2022',
      hasDamage: 'Ja',
    },
    {
      id: '12',
      type: 'Camper',
      brand: 'Volkswagen',
      model: 'Transporter',
      color: 'Blauw',
      purchaseYear: '2020',
      hasDamage: 'Nee',
    },
    {
      id: '13',
      type: 'Camper',
      brand: 'Fiat',
      model: 'Ducato',
      color: 'Wit',
      purchaseYear: '2019',
      hasDamage: 'Ja',
    },
    {
      id: '14',
      type: 'Camper',
      brand: 'Ford',
      model: 'Transit',
      color: 'Rood',
      purchaseYear: '2021',
      hasDamage: 'Nee',
    },
    {
      id: '15',
      type: 'Camper',
      brand: 'Renault',
      model: 'Master',
      color: 'Zwart',
      purchaseYear: '2022',
      hasDamage: 'Nee',
    },
  ];

  const [showModal, setShowModal] = useState(false); // Modal show state
  const [currentwagen, setCurrentwagen] = useState(null); // Huidig geselecteerd voertuig
  const [note, setNote] = useState(''); // Notitie state

  // Functie om modal te openen met voertuiggegevens
  const handleShowModal = (wagen) => {
    setCurrentwagen(wagen);
    setShowModal(true); // Modal openen
    setNote(''); // Reset notitieveld wanneer de modal opent
  };

  // Functie om modal te sluiten
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentwagen(null); // Reset geselecteerd voertuig
  };

  // Functie om notitie toe te voegen
  const handleAddNote = () => {
    if (note.trim()) {
      alert(`Notitie toegevoegd: ${note}`); // Dit is waar je je logica voor het opslaan van notities zou kunnen implementeren
      setNote(''); // Reset notitieveld na toevoegen
    }
  };

  return (
    <div className="achtergrond2">
      <h1 className="huren-titel text-center my-4">Voertuig Gegevens</h1>
      <Container fluid>
        <Table striped bordered hover className="tabel mt-5">
          <thead>
            <tr>
              <th>Type</th>
              <th>Merk</th>
              <th>Model</th>
              <th>Kleur</th>
              <th>Aanschafjaar</th>
              <th>Schade</th>
              <th>Acties</th>
            </tr>
          </thead>
          <tbody>
            {wagens.map((wagen) => (
              <tr key={wagen.id}>
                <td>{wagen.type}</td>
                <td>{wagen.brand}</td>
                <td>{wagen.model}</td>
                <td>{wagen.color}</td>
                <td>{wagen.purchaseYear}</td>
                <td>{wagen.hasDamage}</td>
                <td>
                  <Button className='knop' onClick={() => handleShowModal(wagen)}>
                    Toon Gegevens
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Modal met voertuigdetails */}
      {currentwagen && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
          <Modal.Header closeButton>
            {/* Dynamische titel: Details van (Bouwjaar) Kleur Merk Model */}
            <Modal.Title>{`Gegevens over ${currentwagen.color}e ${currentwagen.brand} ${currentwagen.model} (${currentwagen.purchaseYear}) `}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row className="mb-4">
                <Col md={6}>
                  <Card>
                    <Card.Body>
                      <Card.Title><strong>Type</strong></Card.Title>
                      <Card.Text>{currentwagen.type}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card>
                    <Card.Body>
                      <Card.Title><strong>Merk</strong></Card.Title>
                      <Card.Text>{currentwagen.brand}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={6}>
                  <Card>
                    <Card.Body>
                      <Card.Title><strong>Model</strong></Card.Title>
                      <Card.Text>{currentwagen.model}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card>
                    <Card.Body>
                      <Card.Title><strong>Kleur</strong></Card.Title>
                      <Card.Text>{currentwagen.color}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={6}>
                  <Card>
                    <Card.Body>
                      <Card.Title><strong>Aanschafjaar</strong></Card.Title>
                      <Card.Text>{currentwagen.purchaseYear}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card>
                    <Card.Body>
                      <Card.Title><strong>Schade</strong></Card.Title>
                      <Card.Text>{currentwagen.hasDamage}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col>
                  <Form.Group controlId="formNotitie">
                    <Form.Label><strong>Voeg een notitie toe</strong></Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Schrijf hier je notitie..."
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Sluiten
            </Button>
            <Button variant="success" onClick={handleAddNote}>
              Voeg Notitie Toe
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default FoVoertuigStatus;
