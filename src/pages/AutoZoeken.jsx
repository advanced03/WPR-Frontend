import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import "../style/huren.css";

function AutoZoeken() {
  return (
  <>
    <div className="achtergrond2"></div>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center huren-background"
      >
        <Row>
          <Col className="huren-box mx-3 p-5">
            <h1 className="text-center huren-titel mb-3">Huren</h1>
            <Form>
              <Form.Group className="mb-3 text-center">
                <Form.Label className="mb-3">
                  Kies het type voertuig dat u wilt huren:
                </Form.Label>
                <div className="toggle-center">
                  {/*Als het accounttype overeenkomt met zakelijk moet de disabled prop van react bootstrap gepast worden aan de buttons om ze uit te schakelen*/}
                  <ButtonGroup className="mb-3">
                    <Button className="knop">Auto</Button>
                    <Button className="knop" disabled>
                      Caravan
                    </Button>
                    <Button className="knop" disabled>
                      Camper
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

              {/* Als er geen auto's worden gevonden moet dit een error geven als er auto's worden gevonden door naar de AutoVinden pagina. */}
              <div className="d-flex justify-content-center">
                <Button className="knop mt-3">Zoeken 🔍</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AutoZoeken;
