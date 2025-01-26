import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert, Dropdown, DropdownButton } from 'react-bootstrap';

const Betaal = () => {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [error, setError] = useState('');
  const [rentalCost, setRentalCost] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !cardNumber || !expiryDate || !cvv || !paymentMethod) {
      setError('Alle velden moeten worden ingevuld!');
      return;
    }
    setError('');
    // Stel de verwachte huurkosten in
    setRentalCost(amount * 0.15); // Bijvoorbeeld: 15% van het ingevoerde bedrag als huurprijs
    alert('Betaling verzonden!');
  };

  return (
    <div className="achtergrond2">
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card>
              <Card.Header className="text-center">
                <h4>Betalingspagina</h4>
              </Card.Header>
              <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formAmount" className="mb-3">
                    <Form.Label>Bedrag (€)</Form.Label>
                    <Form.Control
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Vul het bedrag in"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formCardNumber" className="mb-3">
                    <Form.Label>Kaartnummer</Form.Label>
                    <Form.Control
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Vul je kaartnummer in"
                      required
                    />
                  </Form.Group>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="formExpiryDate">
                        <Form.Label>Vervaldatum</Form.Label>
                        <Form.Control
                          type="text"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          placeholder="MM/YY"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formCvv">
                        <Form.Label>CVV</Form.Label>
                        <Form.Control
                          type="text"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          placeholder="CVV"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Betaalmethode kiezen */}
                  <Form.Group controlId="formPaymentMethod" className="mb-3">
                    <Form.Label>Kies Betaalmethode</Form.Label>
                    <DropdownButton
                      id="dropdown-payment-method"
                      title={paymentMethod || 'Kies een betaalmethode'}
                      onSelect={(e) => setPaymentMethod(e)}
                      variant="secondary"
                      className="w-100"
                    >
                      <Dropdown.Item eventKey="credit-card">Creditcard</Dropdown.Item>
                      <Dropdown.Item eventKey="ideal">iDEAL</Dropdown.Item>
                      <Dropdown.Item eventKey="paypal">PayPal</Dropdown.Item>
                      <Dropdown.Item eventKey="klarna">Klarna</Dropdown.Item>
                      <Dropdown.Item eventKey="bancontact">Bancontact</Dropdown.Item>
                      <Dropdown.Item eventKey="giropay">Giropay</Dropdown.Item>
                    </DropdownButton>
                  </Form.Group>

                  <Button type="submit" className="w-100 mt-3 knop">
                    Betalen
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {rentalCost > 0 && (
          <Row className="mt-4 justify-content-center">
            <Col md={6}>
              <Card>
                <Card.Body>
                  <h5>Verwachte huurkosten:</h5>
                  <p>€{rentalCost.toFixed(2)}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Betaal;
