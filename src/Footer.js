import React, { useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { Envelope, HouseDoor } from "react-bootstrap-icons";
import FAQsAndHelp from "./FAQsAndHelp";
import HowToUse from "./HowToUse";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showModal, setShowModal] = useState(false);
  const [showHowToUseModal, setShowHowToUseModal] = useState(false);

  const handleOpenHowToUseModal = () => {
    setShowHowToUseModal(true);
  };

  const handleCloseHowToUseModal = () => {
    setShowHowToUseModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <footer
        style={{
          borderTop: "1px solid #e5e5e5",
          padding: "30px 0",
          background: "linear-gradient(45deg, #f3f4f6, #e5e5e5)",
          marginTop: "50px",
        }}
        className="mt-5"
        role="contentinfo"
      >
        <Container>
          <Row className="mb-4">
            <Col md={6}>
              <h5 style={{ fontWeight: "bold" }}>Mad-A.I.-Libs Fun</h5>
              <p>
                Craft spontaneous stories with the power of AI. Let your
                creativity take the front seat and enjoy the AI-driven
                narratives.
              </p>
            </Col>
            <Col md={3}>
              <h6>
                <HouseDoor className="me-2" /> Quick Links
              </h6>
              <ul
                style={{ listStyleType: "none", padding: 0, fontSize: "0.9em" }}
              >
                <li>
                  <a
                    href="https://bestdev.co.il"
                    style={{ color: "#333", textDecoration: "underline" }}
                  >
                    BestDev.co.il
                  </a>
                </li>
                <li>
                  <Button
                    variant="link"
                    onClick={handleOpenModal}
                    style={{
                      fontSize: "0.9em",
                      textDecoration: "underline",
                      padding: 0,
                    }}
                  >
                    FAQs & Help
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    onClick={handleOpenHowToUseModal}
                    style={{
                      fontSize: "0.9em",
                      textDecoration: "underline",
                      padding: 0,
                    }}
                  >
                    How to Use
                  </Button>
                </li>
              </ul>
            </Col>
            <Col md={3}>
              <h6>
                <Envelope className="me-2" />
                Contact Me
              </h6>
              <p style={{ fontSize: "0.9em" }}>
                <a href="mailto:simon@bestdev.co.il">simon@bestdev.co.il</a>
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <small style={{ color: "#999" }}>
                &copy; {currentYear} Mad-A.I.-Libs Fun. and Simon B.Stirling All
                rights reserved.
              </small>
            </Col>
          </Row>
        </Container>
      </footer>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>FAQs & Help</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FAQsAndHelp />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showHowToUseModal}
        onHide={handleCloseHowToUseModal}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>How to Use</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <HowToUse />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseHowToUseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Footer;
