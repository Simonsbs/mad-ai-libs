import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MadLibForm from "./MadLibForm";
import Footer from "./Footer";
import AppHeader from "./AppHeader";

function App() {
  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <AppHeader />
          <MadLibForm />
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}

export default App;
