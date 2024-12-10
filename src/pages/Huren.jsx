import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';

const Huren = () => {
  const [soortVoertuig, setSoortVoertuig] = useState('');
  const [startDatum, setStartDatum] = useState('');
  const [eindDatum, setEindDatum] = useState('');
  const [beschikbareVoertuigen, setBeschikbareVoertuigen] = useState([]);
  const [gekozenVoertuig, setGekozenVoertuig] = useState(null);
  const [gebruikerInfo, setGebruikerInfo] = useState({
    wettelijkeNaam: '',
    adres: '',
    rijbewijsNummer: '',
    reisBeschrijving: '',
    versteBestemming: '',
    verwachteKilometers: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleSoortVoertuigChange = (e) => {
    setSoortVoertuig(e.target.value);
  };

  const handleDatumChange = (e) => {
    const { name, value } = e.target;
    if (name === 'startDatum') setStartDatum(value);
    if (name === 'eindDatum') setEindDatum(value);
  };

  const handleZoek = () => {
    const mockVoertuigen = [
      { id: 1, type: soortVoertuig, naam: 'Voertuig 1', beschikbareData: ['2024-12-15', '2024-12-16'] },
      { id: 2, type: soortVoertuig, naam: 'Voertuig 2', beschikbareData: ['2024-12-17', '2024-12-18'] }
    ];
    setBeschikbareVoertuigen(mockVoertuigen);
    setCurrentStep(2);
  };

  const handleSelectVoertuig = (voertuig) => {
    setGekozenVoertuig(voertuig);
    setCurrentStep(3);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGebruikerInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  return (
    <Container>
      <Button onClick={handleOpenModal} className="mt-5">
        Start Huren
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{currentStep === 1 ? 'Stap 1: Kies het voertuig' : currentStep === 2 ? 'Stap 2: Kies de data' : 'Stap 3: Vul je gegevens in'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentStep === 1 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Kies het soort voertuig</Form.Label>
                <Form.Control as="select" value={soortVoertuig} onChange={handleSoortVoertuigChange}>
                  <option value="">Selecteer...</option>
                  <option value="Auto">Auto</option>
                  <option value="Caravan">Caravan</option>
                  <option value="Camper">Camper</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Selecteer start- en einddatum</Form.Label>
                <Form.Control type="date" name="startDatum" value={startDatum} onChange={handleDatumChange} />
                <Form.Control type="date" name="eindDatum" value={eindDatum} onChange={handleDatumChange} className="mt-2" />
              </Form.Group>

              <Button variant="primary" onClick={handleZoek}>
                Zoek beschikbare voertuigen
              </Button>
            </>
          )}

          {currentStep === 2 && (
            <>
              {beschikbareVoertuigen.length > 0 && (
                <ListGroup className="mt-3">
                  {beschikbareVoertuigen.map((voertuig) => (
                    <ListGroup.Item
                      key={voertuig.id}
                      action
                      onClick={() => handleSelectVoertuig(voertuig)}
                      active={gekozenVoertuig && gekozenVoertuig.id === voertuig.id}
                    >
                      {voertuig.naam} - {voertuig.type}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </>
          )}

          {currentStep === 3 && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Wettelijke naam</Form.Label>
                <Form.Control
                  type="text"
                  name="wettelijkeNaam"
                  value={gebruikerInfo.wettelijkeNaam}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Adresgegevens</Form.Label>
                <Form.Control
                  type="text"
                  name="adres"
                  value={gebruikerInfo.adres}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Rijbewijsnummer</Form.Label>
                <Form.Control
                  type="text"
                  name="rijbewijsNummer"
                  value={gebruikerInfo.rijbewijsNummer}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Korte beschrijving van de aard van de reis</Form.Label>
                <Form.Control
                  as="textarea"
                  name="reisBeschrijving"
                  value={gebruikerInfo.reisBeschrijving}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Verste bestemming</Form.Label>
                <Form.Control
                  type="text"
                  name="versteBestemming"
                  value={gebruikerInfo.versteBestemming}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Verwachte kilometers</Form.Label>
                <Form.Control
                  type="text"
                  name="verwachteKilometers"
                  value={gebruikerInfo.verwachteKilometers}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Button variant="success" type="submit">
                Bevestig verhuur
              </Button>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          {currentStep > 1 && (
            <Button variant="secondary" onClick={() => setCurrentStep((prevStep) => prevStep - 1)}>
              Vorige
            </Button>
          )}
          <Button variant="primary" onClick={handleNextStep}>
            {currentStep === 3 ? 'Bevestig' : 'Volgende'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Huren;
