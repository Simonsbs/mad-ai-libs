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
    <Container className="text-center mb-4">
      <h1>Mad-AI-Libs Fun</h1>
      <p>
        Welcome to <strong>Mad-AI-Libs Fun</strong>, a modern twist on the
        classic MadLibs game.
      </p>

      <Row className="mt-3">
        <Col md={3}>
          <LightbulbFill size={32} className="mb-2" />
          <h5>Innovative</h5>
          <p>
            Powered by state-of-the-art AI technology to craft engaging and
            hilarious stories.
          </p>
        </Col>

        <Col md={3}>
          <Book size={32} className="mb-2" />
          <h5>Storytelling</h5>
          <p>
            Dive deep into the world of unpredictable and spontaneous
            storytelling, crafted just for you.
          </p>
        </Col>

        <Col md={3}>
          <PencilSquare size={32} className="mb-2" />
          <h5>Interactive</h5>
          <p>
            Participate by filling in the blanks and watch as your inputs come
            to life in the story.
          </p>
        </Col>

        <Col md={3}>
          <Robot size={32} className="mb-2" />
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
