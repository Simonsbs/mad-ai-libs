import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MadLibForm from "./MadLibForm";

function App() {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1 className="text-center">Mad Libs Game</h1>
          <p className="text-center">
            Fill in the blanks with appropriate words and generate a fun story!
          </p>
          <MadLibForm />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
