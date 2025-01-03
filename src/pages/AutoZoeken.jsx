import React, { useState } from "react";
import { Container, Row, Col, Form, Button, ButtonGroup } from "react-bootstrap";
import "../style/huren.css";
import "../style/universeel.css";
import PartNavbar from "../components/PartNavbar.jsx";

function AutoZoeken() {
  const [selectedType, setSelectedType] = useState(null);

  const handleSelect = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="achtergrond2">
      <PartNavbar />
      <Container fluid className="d-flex justify-content-center align-items-center container-center">
        <Row>
          <Col className="huren-box p-5">
            <h1 className="text-center huren-titel mb-3">Huren</h1>
            <Form>
              <Form.Group className="mb-3 text-center">
                <Form.Label className="mb-4">
                  Kies het type voertuig dat u wilt huren:
                </Form.Label>
                <div className="toggle-center">
                  <ButtonGroup className="mb-3">
                    <Button
                      variant={selectedType === "auto" ? "primary" : "outline-primary"}
                      onClick={() => handleSelect("auto")}
                    >
                      Auto 🚗
                    </Button>
                    {/* Als gebruikerstype overeenkomt met zakelijk moet dit disabled zijn */}
                    <Button
                      variant={selectedType === "caravan" ? "primary" : "outline-primary"}
                      onClick={() => handleSelect("caravan")}
                    >
                      Caravan ⛺
                    </Button>
                    {/* Als gebruikerstype overeenkomt met zakelijk moet dit disabled zijn */}
                    <Button
                      variant={selectedType === "camper" ? "primary" : "outline-primary"}
                      onClick={() => handleSelect("camper")}
                    >
                      Camper 🚐
                    </Button>
                  </ButtonGroup>
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="mb-2">Van</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Kies een startdatum"
                  className="mb-3"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="mb-2">Tot</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Kies een einddatum"
                  className="mb-3"
                />
              </Form.Group>

              <div className="d-flex justify-content-center">
                <Button className="knop mt-3">Zoeken 🔍</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AutoZoeken;
