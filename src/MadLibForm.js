import React, { useEffect, useState } from "react";
import { Button, Row, Container, Alert, Card } from "react-bootstrap";
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
  const [storyLength, setStoryLength] = useState(() => {
    const savedValue = localStorage.getItem("madlibsStoryLength");
    return savedValue ? Number(savedValue) : 10;
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
    setStoryLength(10);
  };

  const handleGenerateStory = async () => {
    setLoadingStory(true);
    try {
      const generatedStory = await generateStory(storyLength);
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
    localStorage.setItem("madlibsStoryLength", storyLength);
  }, [inputs, story, storyLength]);

  return (
    <Container className="mt-4">
      {/* Display API errors */}
      {apiError && (
        <Alert
          variant="danger"
          className="mb-3"
          onClose={() => setApiError(null)}
          dismissible
        >
          {apiError}
        </Alert>
      )}

      {/* Input Groups */}
      {["noun", "verb", "adjective", "adverb"].map((type) => {
        const placeholdersOfType = placeholders.filter((placeholder) =>
          placeholder.startsWith(type)
        );

        if (placeholdersOfType.length === 0) return null;

        return (
          <Card className="mb-4 shadow-sm" key={type}>
            <Card.Header>
              <h5>{type.charAt(0).toUpperCase() + type.slice(1)}s</h5>
            </Card.Header>
            <Card.Body>
              <Row className="gy-3">
                {placeholdersOfType.map((placeholder, index) => (
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
            </Card.Body>
          </Card>
        );
      })}

      <div className="mb-4 d-flex align-items-center">
        <label className="me-2">Story Length: {storyLength} words</label>
        <input
          type="range"
          min="10"
          max="150"
          value={storyLength}
          onChange={(e) => {
            setStoryLength(e.target.value);
          }}
          style={{ flex: 1 }}
        />
      </div>
      <div className="d-flex justify-content-center gy-3">
        <Button
          variant="primary"
          className="me-2"
          onClick={handleGenerateStory}
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

        <Button
          variant="secondary"
          className="me-2"
          onClick={handleRandomFill}
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

        <Button variant="danger" onClick={handleClear}>
          <XCircleFill className="me-2" />
          Reset Everything
        </Button>
      </div>

      {/* Display the story */}
      <StoryDisplay story={story} inputs={inputs} focusedInput={focusedInput} />
    </Container>
  );
};

export default MadLibForm;
