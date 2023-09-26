import React, { useEffect, useState } from "react";
import {
  Button,
  Row,
  Container,
  Alert,
  Card,
  OverlayTrigger,
  Tooltip,
  Toast,
} from "react-bootstrap";
import {
  XCircleFill,
  Shuffle,
  LightningFill,
  InfoCircle,
  Robot,
  Share,
  Trash,
} from "react-bootstrap-icons";
import InputField from "./InputField";
import StoryDisplay from "./StoryDisplay";
import {
  generateContextualWords,
  generateRandomWords,
  generateStory,
} from "./utils/api";
import OnboardingModal from "./OnboardingModal";
import { CSSTransition } from "react-transition-group";
import "./MadLibForm.css";
import SidePanel from "./SidePanel";

const MadLibForm = () => {
  const defaultStory =
    "once apon a [noun1]... a new user visited a site and clicked the 'Generate Story' button in the options tab and generated a brand new story and filled in all the missing words";
  const defaultInputs = { noun1: "time" };

  const [story, setStory] = useState(() => {
    const savedStory = localStorage.getItem("madlibsStory");
    return savedStory || defaultStory;
  });

  const [inputs, setInputs] = useState(() => {
    const savedInputs = localStorage.getItem("madlibsInputs");
    return savedInputs ? JSON.parse(savedInputs) : defaultInputs;
  });
  const [storyLength, setStoryLength] = useState(() => {
    const savedValue = localStorage.getItem("madlibsStoryLength");
    return savedValue ? Number(savedValue) : 10;
  });
  const [loadingStory, setLoadingStory] = useState(false);
  const [loadingWords, setLoadingWords] = useState(false);
  const [loadingContextual, setLoadingContextual] = useState(false);

  const [focusedInput, setFocusedInput] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [showTutorial, setShowTutorial] = useState(() => {
    return !localStorage.getItem("hasSeenTutorial");
  });
  const [feedback, setFeedback] = useState(null);

  function getWordTypeExplanation(wordType) {
    switch (wordType) {
      case "noun":
        return {
          definition:
            "A noun is a word that represents a person, place, thing, or idea. Examples: car, city, freedom.",
          examples: "e.g. car, city, freedom",
        };
      case "verb":
        return {
          definition:
            "A verb is an action word or a state of being. Examples: run, is, feel.",
          examples: "e.g. run, is, feel",
        };
      case "adjective":
        return {
          definition:
            "An adjective describes or modifies a noun. Examples: happy, green, large.",
          examples: "e.g. happy, green, large",
        };
      case "adverb":
        return {
          definition:
            "An adverb describes or modifies a verb, adjective, or another adverb. Examples: quickly, very, well.",
          examples: "e.g. quickly, very, well",
        };
      default:
        return {
          definition: "",
          examples: "",
        };
    }
  }

  function extractPlaceholders(story) {
    const matchedPlaceholders = story.match(/\[[a-z]+\d+\]/g) || [];
    const uniquePlaceholders = [...new Set(matchedPlaceholders)];
    return uniquePlaceholders.map((placeholder) => placeholder.slice(1, -1));
  }

  const generateShareableLink = () => {
    const baseURL = window.location.origin;
    const storyParam = encodeURIComponent(story);
    const inputsParam = encodeURIComponent(JSON.stringify(inputs));

    return `${baseURL}?story=${storyParam}&inputs=${inputsParam}`;
  };

  const handleShare = () => {
    const shareableLink = generateShareableLink();
    navigator.clipboard.writeText(shareableLink);
    setFeedback("Link copied to clipboard!");
  };

  const reShowTutorial = () => {
    setShowTutorial(true);
  };

  const placeholders = extractPlaceholders(story || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setInputs(defaultInputs);
    setStory(defaultStory);
    setStoryLength(80);
    setFeedback("All reset");
  };

  const handleClearInputs = () => {
    setInputs(defaultInputs);
    setFeedback("Inputs reset");
  };

  const handleGenerateStory = async () => {
    setLoadingStory(true);
    try {
      const generatedStory = await generateStory(storyLength);
      setStory(generatedStory);
      setApiError(null);
      setFeedback("Story generated successfully!");
    } catch (error) {
      setApiError("Error generating story. Please try again.");
    } finally {
      setLoadingStory(false);
    }
  };

  const handleContextualFill = async () => {
    setLoadingContextual(true);
    try {
      const results = await generateContextualWords(placeholders, story);
      setInputs(results);
      setApiError(null);
      setFeedback("Contextual words generated successfully!");
    } catch (error) {
      setApiError(
        "Error fetching contextually appropriate words. Please try again."
      );
    } finally {
      setLoadingContextual(false);
    }
  };

  const handleRandomFill = async () => {
    setLoadingWords(true);
    try {
      const results = await generateRandomWords(placeholders);
      setInputs(results);
      setApiError(null);
      setFeedback("Words filled randomly!");
    } catch (error) {
      setApiError("Error fetching random words. Please try again.");
    } finally {
      setLoadingWords(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const storyParam = urlParams.get("story");
    const inputsParam = urlParams.get("inputs");

    if (storyParam) {
      setStory(decodeURIComponent(storyParam));
    }
    if (inputsParam) {
      setInputs(JSON.parse(decodeURIComponent(inputsParam)));
    }

    // Remove the URL parameters without reloading the page
    const cleanURL = window.location.href.split("?")[0];
    window.history.replaceState({}, "", cleanURL);
  }, []);

  useEffect(() => {
    localStorage.setItem("madlibsInputs", JSON.stringify(inputs));
    localStorage.setItem("madlibsStory", story);
    localStorage.setItem("madlibsStoryLength", storyLength);
  }, [inputs, story, storyLength]);

  return (
    <Container className="mt-4">
      <OnboardingModal
        forceShow={showTutorial}
        onClose={() => setShowTutorial(false)}
      />

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

      {["noun", "verb", "adjective", "adverb"].map((type, typeIndex) => {
        const placeholdersOfType = placeholders.filter((placeholder) =>
          placeholder.startsWith(type)
        );

        if (placeholdersOfType.length === 0) return null;

        const { definition, examples } = getWordTypeExplanation(type);

        return (
          <CSSTransition key={type} timeout={300} classNames="fade">
            <Card className="mb-4 shadow-sm">
              <Card.Header className="d-flex justify-content-between">
                <h5>{type.charAt(0).toUpperCase() + type.slice(1)}s</h5>
                <OverlayTrigger
                  placement="left"
                  overlay={
                    <Tooltip>
                      {definition} {examples}
                    </Tooltip>
                  }
                >
                  <InfoCircle />
                </OverlayTrigger>
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
          </CSSTransition>
        );
      })}

      <SidePanel>
        <h6 className="text-muted">Settings</h6>
        <div className="p-3 rounded shadow-sm bg-light mb-4">
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                Adjust the length of the story you'd like to generate.
              </Tooltip>
            }
          >
            <div className="mb-3">
              <label className="mb-2 d-block">Story Length:</label>
              <input
                type="range"
                className="form-range"
                min="10"
                max="160"
                value={storyLength}
                onChange={(e) => {
                  setStoryLength(e.target.value);
                }}
              />
              <div className="text-center font-weight-bold mt-1">
                ~{storyLength} words
              </div>
            </div>
          </OverlayTrigger>
        </div>

        <h6 className="text-muted">Actions</h6>

        <div className="mb-4">
          <Button
            variant="primary"
            onClick={handleGenerateStory}
            disabled={loadingStory}
            className={`icon-left-button mb-2 w-100`}
          >
            {loadingStory ? (
              <Robot className="spinning btn-icon" size={32} />
            ) : (
              <LightningFill className="btn-icon" />
            )}
            <span className="btn-text">Generate Story</span>
          </Button>

          <Button
            variant="success"
            onClick={handleRandomFill}
            disabled={loadingWords}
            className={`icon-left-button mb-2 w-100`}
          >
            {loadingWords ? (
              <Robot className="spinning btn-icon" size={32} />
            ) : (
              <Shuffle className="btn-icon" />
            )}
            <span className="btn-text">Fill Randomly</span>
          </Button>

          <Button
            variant="info"
            onClick={handleContextualFill}
            disabled={loadingContextual}
            className={`icon-left-button mb-2 w-100`}
          >
            {loadingContextual ? (
              <Robot className="spinning btn-icon" size={32} />
            ) : (
              <LightningFill className="btn-icon" />
            )}
            <span className="btn-text">Contextual Fill</span>
          </Button>

          <Button
            variant="outline-warning"
            onClick={handleClearInputs}
            className={`icon-left-button mb-2 w-100`}
            style={{ borderColor: "#FFA07A", color: "#FFA07A" }}
          >
            <Trash className="btn-icon" />
            <span className="btn-text">Reset Inputs</span>
          </Button>

          <Button
            variant="danger"
            onClick={handleClear}
            className={`icon-left-button mb-2 w-100`}
          >
            <XCircleFill className="btn-icon" />
            <span className="btn-text">Reset Everything</span>
          </Button>

          <Button
            variant="warning"
            onClick={reShowTutorial}
            className={`icon-left-button mb-2 w-100`}
          >
            <InfoCircle className="btn-icon" />
            <span className="btn-text">Show Tutorial</span>
          </Button>

          <Button
            variant="secondary"
            onClick={handleShare}
            className={`icon-left-button w-100`}
          >
            <Share className="btn-icon" />
            <span className="btn-text">Share your Story</span>
          </Button>
        </div>
      </SidePanel>

      <StoryDisplay story={story} inputs={inputs} focusedInput={focusedInput} />

      <Toast
        onClose={() => setFeedback(null)}
        show={feedback !== null}
        delay={3000}
        autohide
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1000,
          backgroundColor: "lightblue",
        }}
      >
        <Toast.Body>{feedback}</Toast.Body>
      </Toast>
    </Container>
  );
};

export default MadLibForm;
