import React, { useState } from "react";
import { Button, Row, Col, Container, Form } from "react-bootstrap";
import { XCircleFill, Shuffle, LightningFill } from "react-bootstrap-icons";
import InputField from "./InputField";
import StoryDisplay from "./StoryDisplay";
import { generateRandomWords, generateStory } from "./utils/api";

const MadLibForm = () => {
  const [inputs, setInputs] = useState({});
  const [story, setStory] = useState(null);

  const placeholders = ["noun", "verb", "adjective", "adverb"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    const clearedInputs = {};
    placeholders.forEach((item) => (clearedInputs[item] = ""));
    setInputs(clearedInputs);
  };

  const handleGenerateStory = async (e) => {
    e.preventDefault();
    const generatedStory = await generateStory(prompt);
    setStory(generatedStory);
  };

  const handleRandomFill = async () => {
    const results = await generateRandomWords();
    const randomInputs = {};
    for (let i = 0; i < placeholders.length; i++) {
      randomInputs[placeholders[i]] = results[i];
    }
    setInputs(randomInputs);
  };

  return (
    <Container>
      <Form>
        <Row className="gy-3">
          {placeholders.map((placeholder, index) => (
            <InputField
              key={index}
              name={placeholder}
              value={inputs[placeholder] || ""}
              onChange={handleChange}
            />
          ))}
        </Row>
      </Form>
      <Row className="gy-3">
        <Col md>
          <Button
            variant="primary"
            onClick={handleGenerateStory}
            style={{ width: "100%" }}
          >
            <LightningFill className="me-2" />
            Generate Story
          </Button>
        </Col>
        <Col md>
          <Button
            variant="secondary"
            onClick={handleRandomFill}
            style={{ width: "100%" }}
          >
            <Shuffle className="me-2" />
            Fill Randomly
          </Button>
        </Col>
        <Col md>
          <Button
            variant="danger"
            onClick={handleClear}
            style={{ width: "100%" }}
          >
            <XCircleFill className="me-2" />
            Reset
          </Button>
        </Col>
      </Row>

      {story && <StoryDisplay story={story} inputs={inputs} />}
    </Container>
  );
};

export default MadLibForm;
