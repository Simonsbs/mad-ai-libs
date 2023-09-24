import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  Envelope,
  Telephone,
  HouseDoor,
  QuestionCircle,
} from "react-bootstrap-icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid #e5e5e5",
        padding: "30px 0",
        backgroundColor: "#f9f9f9",
      }}
      className="mt-5"
    >
      <Container>
        <Row className="mb-4">
          <Col md={6}>
            <h5 style={{ fontWeight: "bold" }}>AI-Libs Fun</h5>
            <p>
              Craft spontaneous stories with the power of AI. Let your
              creativity take the front seat and enjoy the AI-driven narratives.
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
                <a href="https://bestdev.co.il" style={{ color: "#333" }}>
                  BestDev.co.il
                </a>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>
              <Envelope className="me-2" />
              Contact Me
            </h6>
            <p style={{ fontSize: "0.9em" }}>
              <strong>Email:</strong> simon@bestdev.co.il
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <small style={{ color: "#999" }}>
              &copy; {currentYear} AI-Libs Fun. All rights reserved.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
