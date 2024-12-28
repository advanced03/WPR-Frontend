import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form } from 'react-bootstrap';
import '../style/frontoffice.css';

const FoVoertuig = () => {
  const [vehicleData, setVehicleData] = useState(null);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Simulatie van het ophalen van voertuiggegevens
    const fetchData = async () => {
      const data = {
        id: '12345',
        name: 'Volkswagen Passat',
        status: 'Beschikbaar',
        damages: ['Deuk in linkerportier', 'Kras op achterbumper'],
        maintenanceHistory: [
          { date: '2023-06-15', detail: 'Olie verversing' },
          { date: '2023-09-20', detail: 'Remmen vervangen' },
        ],
      };
      setVehicleData(data);
    };

    fetchData();
  }, []);

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote]);
      setNewNote('');
      setShowNoteModal(false);
    }
  };

  if (!vehicleData) return <p>Gegevens worden geladen...</p>;

  return (
    <div className="achtergrond2">
        <h1 className='huren-titel text-center p-5'>Voertuig gegevens:</h1>
    <Container fluid className='voertuig-container'>
      <Row className="my-3">
        <Col>
          <Card>
            <Card.Header>Voertuig Details</Card.Header>
            <Card.Body>
              <h5>{vehicleData.name}</h5>
              <p><strong>Status:</strong> {vehicleData.status}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className='schade'>
            <Card.Header>Schades</Card.Header>
            <Card.Body>
              <ul>
                {vehicleData.damages.map((damage, index) => (
                  <li key={index}>{damage}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Onderhoudsgeschiedenis</Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Datum</th>
                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleData.maintenanceHistory.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.date}</td>
                      <td>{entry.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <Card>
            <Card.Header>Notities</Card.Header>
            <Card.Body>
              <ul>
                {notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
              <Button className='knop' onClick={() => setShowNoteModal(true)}>Notitie Toevoegen</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showNoteModal} onHide={() => setShowNoteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Notitie Toevoegen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Notitie</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNoteModal(false)}>
            Annuleren
          </Button>
          <Button variant="success" onClick={handleAddNote}>
            Toevoegen
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </div>
  );
};

export default FoVoertuig;
