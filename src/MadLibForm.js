import React, { useEffect, useState } from "react";
import { Button, Row, Col, Container, Form, Alert } from "react-bootstrap";
import { XCircleFill, Shuffle, LightningFill } from "react-bootstrap-icons";
import InputField from "./InputField";
import StoryDisplay from "./StoryDisplay";
import { generateRandomWords, generateStory } from "./utils/api";
import { Spinner } from "react-bootstrap";

const MadLibForm = () => {
  const [story, setStory] = useState(() => {
    const savedStory = localStorage.getItem("madlibsStory");
    return savedStory || "once apon a [noun1]...";
  });

  const [inputs, setInputs] = useState(() => {
    const savedInputs = localStorage.getItem("madlibsInputs");
    return savedInputs ? JSON.parse(savedInputs) : {};
  });

  const [loadingStory, setLoadingStory] = useState(false);
  const [loadingWords, setLoadingWords] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [apiError, setApiError] = useState(null);

  function extractPlaceholders(story) {
    const matchedPlaceholders = story.match(/\[[a-z]+\d+\]/g) || [];
    const uniquePlaceholders = [...new Set(matchedPlaceholders)];
    return uniquePlaceholders.map((placeholder) => placeholder.slice(1, -1));
  }

  const placeholders = extractPlaceholders(story || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setInputs({});
    setStory("once apon a [noun1]...");
  };

  const handleGenerateStory = async () => {
    setLoadingStory(true);
    try {
      const generatedStory = await generateStory();
      setStory(generatedStory);
      setApiError(null);
    } catch (error) {
      setApiError("Error generating story. Please try again.");
    } finally {
      setLoadingStory(false);
    }
  };

  const handleRandomFill = async () => {
    setLoadingWords(true);
    try {
      const results = await generateRandomWords(placeholders);
      setInputs(results);
      setApiError(null);
    } catch (error) {
      setApiError("Error fetching random words. Please try again.");
    } finally {
      setLoadingWords(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("madlibsInputs", JSON.stringify(inputs));
    localStorage.setItem("madlibsStory", story);
  }, [inputs, story]);

  return (
    <Container>
      {apiError && (
        <Alert
          variant="danger"
          className="mt-3"
          onClose={() => setApiError(null)}
          dismissible
        >
          {apiError}
        </Alert>
      )}
      <Form>
        <Row className="gy-3">
          {placeholders.map((placeholder, index) => (
            <InputField
              key={index}
              name={placeholder}
              value={inputs[placeholder] || ""}
              onChange={handleChange}
              onFocus={() => setFocusedInput(placeholder)}
              onBlur={() => setFocusedInput(null)}
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
            disabled={loadingStory}
          >
            {loadingStory ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="ms-2">Generating...</span>
              </>
            ) : (
              <>
                <LightningFill className="me-2" />
                Generate Story
              </>
            )}
          </Button>
        </Col>
        <Col md>
          <Button
            variant="secondary"
            onClick={handleRandomFill}
            style={{ width: "100%" }}
            disabled={loadingWords}
          >
            {loadingWords ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="ms-2">Fetching Words...</span>
              </>
            ) : (
              <>
                <Shuffle className="me-2" />
                Fill Randomly
              </>
            )}
          </Button>
        </Col>
        <Col md>
          <Button
            variant="danger"
            onClick={handleClear}
            style={{ width: "100%" }}
          >
            <XCircleFill className="me-2" />
            Reset Everything
          </Button>
        </Col>
      </Row>
      <StoryDisplay story={story} inputs={inputs} focusedInput={focusedInput} />
    </Container>
  );
};

export default MadLibForm;
