import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MadLibForm from "./MadLibForm";
import Footer from "./Footer";
import AppHeader from "./AppHeader";

function App() {
  useEffect(() => {
    forceSSL();
  }, []);

  const forceSSL = () => {
    if (window.location.protocol !== "https:") {
      window.location.href = `https:${window.location.href.substring(
        window.location.protocol.length
      )}`;
    }
  };

  return (
    <>
      <Container className="mt-5 mb-5">
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <AppHeader />
            <MadLibForm />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default App;
