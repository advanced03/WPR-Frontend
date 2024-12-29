import React, { useState } from 'react';
import { Container, Table, Button, Modal, Row, Col, Form } from 'react-bootstrap';
import "../style/tabel.css";

const FoVoertuigStatus = () => {
  // Mock data voor voertuigen, 5 voertuigen per type
  const [wagens, setWagens] = useState([
    // Auto's
    {
      id: '1',
      type: 'Auto',
      brand: 'Volkswagen',
      model: 'Passat',
      color: 'Blauw',
      purchaseYear: '2020',
      hasDamage: 'Ja',
      note: '', // Notitieveld toegevoegd
    },
    {
      id: '2',
      type: 'Auto',
      brand: 'Audi',
      model: 'A4',
      color: 'Zwart',
      purchaseYear: '2019',
      hasDamage: 'Nee',
      note: '', // Notitieveld toegevoegd
    },
    {
      id: '3',
      type: 'Auto',
      brand: 'BMW',
      model: '3 Serie',
      color: 'Wit',
      purchaseYear: '2021',
      hasDamage: 'Ja',
      note: '', // Notitieveld toegevoegd
    },
    {
      id: '4',
      type: 'Auto',
      brand: 'Mercedes-Benz',
      model: 'C-Klasse',
      color: 'Grijs',
      purchaseYear: '2018',
      hasDamage: 'Nee',
      note: '', // Notitieveld toegevoegd
    },
    {
      id: '5',
      type: 'Auto',
      brand: 'Peugeot',
      model: '308',
      color: 'Rood',
      purchaseYear: '2022',
      hasDamage: 'Nee',
      note: '', // Notitieveld toegevoegd
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
      note: '', // Notitieveld toegevoegd
    },
    {
      id: '7',
      type: 'Caravan',
      brand: 'Fendt',
      model: 'Opal',
      color: 'Grijs',
      purchaseYear: '2021',
      hasDamage: 'Ja',
      note: '', // Notitieveld toegevoegd
    },
    {
      id: '8',
      type: 'Caravan',
      brand: 'Knaus',
      model: 'Sport',
      color: 'Blauw',
      purchaseYear: '2020',
      hasDamage: 'Ja',
      note: '', // Notitieveld toegevoegd
    },
    {
      id: '9',
      type: 'Caravan',
      brand: 'Adria',
      model: 'Altea',
      color: 'Groen',
      purchaseYear: '2019',
      hasDamage: 'Nee',
      note: '', // Notitieveld toegevoegd
    },
    {
      id: '10',
      type: 'Caravan',
      brand: 'Tabbert',
      model: 'Puccini',
      color: 'Rood',
      purchaseYear: '2022',
      hasDamage: 'Nee',
      note: '', // Notitieveld toegevoegd
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
      note: '', // Notitieveld toegevoegd
    },
    {
      id: '12',
      type: 'Camper',
      brand: 'Volkswagen',
      model: 'Transporter',
      color: 'Blauw',
      purchaseYear: '2020',
      hasDamage: 'Nee',
      note: '', // Notitieveld toegevoegd
    },
    {
      id: '13',
      type: 'Camper',
      brand: 'Fiat',
      model: 'Ducato',
      color: 'Wit',
      purchaseYear: '2019',
      hasDamage: 'Ja',
      note: '', // Notitieveld toegevoegd
    },
    {
      id: '14',
      type: 'Camper',
      brand: 'Ford',
      model: 'Transit',
      color: 'Rood',
      purchaseYear: '2021',
      hasDamage: 'Nee',
      note: '', // Notitieveld toegevoegd
    },
    {
      id: '15',
      type: 'Camper',
      brand: 'Renault',
      model: 'Master',
      color: 'Zwart',
      purchaseYear: '2022',
      hasDamage: 'Nee',
      note: '', // Notitieveld toegevoegd
    },
  ]);

  const [showModal, setShowModal] = useState(false); // Modal show state
  const [currentwagen, setCurrentwagen] = useState(null); // Huidig geselecteerd voertuig
  const [note, setNote] = useState(''); // Notitie state

  // Functie om modal te openen met voertuiggegevens
  const handleShowModal = (wagen) => {
    setCurrentwagen(wagen);
    setNote(wagen.note || ''); // Laad notitie van het geselecteerde voertuig
    setShowModal(true); // Modal openen
  };

  // Functie om modal te sluiten
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentwagen(null); // Reset geselecteerd voertuig
  };

  // Functie om notitie toe te voegen
  const handleAddNote = () => {
    if (note.trim()) {
      const updatedWagens = wagens.map((wagen) => {
        if (wagen.id === currentwagen.id) {
          return { ...wagen, note }; // Werk de notitie bij voor het geselecteerde voertuig
        }
        return wagen;
      });
      setWagens(updatedWagens); // Update de voertuigenlijst
      alert(`Notitie toegevoegd: ${note}`); // Dit is waar je je logica voor het opslaan van notities zou kunnen implementeren
      setNote(''); // Reset notitieveld na toevoegen
      setShowModal(false); // Sluit modal na toevoegen
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
              <th>Voeg notitie toe</th>
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
                  <Button variant='light' onClick={() => handleShowModal(wagen)}>
                    🖊️
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      
      {currentwagen && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>{`Gegevens over ${currentwagen.brand} ${currentwagen.model} ${currentwagen.purchaseYear} ${currentwagen.color}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
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
