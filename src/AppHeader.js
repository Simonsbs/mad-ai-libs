import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  LightbulbFill,
  Book,
  PencilSquare,
  Robot,
} from "react-bootstrap-icons";

const AppHeader = () => {
  return (
    <Container
      className="text-center mb-4 py-5"
      style={{
        background: "linear-gradient(45deg, #f3f4f6, #e5e5e5)",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
        border: "1px solid darkgrey",
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>Mad-AI-Libs Fun</h1>
      <p style={{ fontSize: "1.25rem", color: "#555" }}>
        The classic MadLibs game with a modern AI twist!
      </p>

      <Row className="mt-5">
        <Col md={3}>
          <LightbulbFill size={40} className="mb-3" color="#ffa726" />
          <h5>Innovative</h5>
          <p>
            Powered by state-of-the-art AI technology to craft engaging and
            hilarious stories.
          </p>
        </Col>

        <Col md={3}>
          <Book size={40} className="mb-3" color="#4CAF50" />
          <h5>Storytelling</h5>
          <p>
            Dive deep into the world of unpredictable and spontaneous
            storytelling, crafted just for you.
          </p>
        </Col>

        <Col md={3}>
          <PencilSquare size={40} className="mb-3" color="#2196F3" />
          <h5>Interactive</h5>
          <p>
            Participate by filling in the blanks and watch as your inputs come
            to life in the story.
          </p>
        </Col>

        <Col md={3}>
          <Robot size={40} className="mb-3" color="#9C27B0" />
          <h5>AI-Powered</h5>
          <p>
            Using the power of artificial intelligence, every story generated is
            unique and dynamic.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AppHeader;
