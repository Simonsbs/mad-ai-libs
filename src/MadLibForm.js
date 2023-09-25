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
  Col,
} from "react-bootstrap";
import {
  XCircleFill,
  Shuffle,
  LightningFill,
  InfoCircle,
  Robot,
  Share,
} from "react-bootstrap-icons";
import InputField from "./InputField";
import StoryDisplay from "./StoryDisplay";
import { generateRandomWords, generateStory } from "./utils/api";
import OnboardingModal from "./OnboardingModal";
import { CSSTransition } from "react-transition-group";
import "./MadLibForm.css";
import FAQsAndHelp from "./FAQsAndHelp";
import HowToUse from "./HowToUse";

const MadLibForm = () => {
  const [story, setStory] = useState(() => {
    const savedStory = localStorage.getItem("madlibsStory");
    return savedStory || "once apon a [noun1]...";
  });

  const [inputs, setInputs] = useState(() => {
    const savedInputs = localStorage.getItem("madlibsInputs");
    return savedInputs ? JSON.parse(savedInputs) : { noun1: "time" };
  });
  const [storyLength, setStoryLength] = useState(() => {
    const savedValue = localStorage.getItem("madlibsStoryLength");
    return savedValue ? Number(savedValue) : 10;
  });
  const [loadingStory, setLoadingStory] = useState(false);
  const [loadingWords, setLoadingWords] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [showTutorial, setShowTutorial] = useState(() => {
    return !localStorage.getItem("hasSeenTutorial");
  });
  const [feedback, setFeedback] = useState(null);

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
    setInputs({ noun1: "time" });
    setStory("once apon a [noun1]...");
    setStoryLength(80);
    setFeedback("All reset");
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

      <HowToUse />

      {["noun", "verb", "adjective", "adverb"].map((type, typeIndex) => {
        const placeholdersOfType = placeholders.filter((placeholder) =>
          placeholder.startsWith(type)
        );

        if (placeholdersOfType.length === 0) return null;

        return (
          <CSSTransition key={type} timeout={300} classNames="fade">
            <Card className="mb-4 shadow-sm">
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
          </CSSTransition>
        );
      })}

      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip>
            Adjust the length of the story you'd like to generate.
          </Tooltip>
        }
      >
        <div className="mb-4 p-3 rounded shadow-sm bg-light">
          <div className="d-flex align-items-center mb-2">
            <label className="me-2 flex-shrink-0">Story Length:</label>
            <input
              type="range"
              className="form-range mx-3"
              min="10"
              max="160"
              value={storyLength}
              onChange={(e) => {
                setStoryLength(e.target.value);
              }}
              style={{ flex: 1 }}
            />
          </div>
          <div className="text-center font-weight-bold">
            ~{storyLength} words
          </div>
        </div>
      </OverlayTrigger>

      <div className="d-flex justify-content-center gy-3 mb-3">
        <Row className="w-100 gy-2 justify-content-center">
          <Col xs={12} sm={4} md={6}>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Generate a new story.</Tooltip>}
            >
              <Button
                variant="primary"
                onClick={handleGenerateStory}
                disabled={loadingStory}
                style={{ width: "100%" }}
              >
                {loadingStory ? (
                  <>
                    <Robot className="spinning me-2" size={32} />
                    Crafting your story
                  </>
                ) : (
                  <>
                    <LightningFill className="me-2" />
                    Generate Story
                  </>
                )}
              </Button>
            </OverlayTrigger>
          </Col>

          <Col xs={12} sm={4} md={6}>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  Automatically fill in the word placeholders for you.
                </Tooltip>
              }
            >
              <Button
                variant="secondary"
                onClick={handleRandomFill}
                disabled={loadingWords}
                style={{ width: "100%" }}
              >
                {loadingWords ? (
                  <>
                    <Robot className="spinning me-2" size={32} />
                    Fetching words
                  </>
                ) : (
                  <>
                    <Shuffle className="me-2" />
                    Fill Randomly
                  </>
                )}
              </Button>
            </OverlayTrigger>
          </Col>

          <Col xs={12} sm={4} md={6}>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Clear all fields and start over.</Tooltip>}
            >
              <Button
                variant="danger"
                onClick={handleClear}
                style={{ width: "100%" }}
              >
                <XCircleFill className="me-2" />
                Reset Everything
              </Button>
            </OverlayTrigger>
          </Col>

          <Col xs={12} sm={4} md={6}>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>See the tutorial again.</Tooltip>}
            >
              <Button
                variant="info"
                onClick={reShowTutorial}
                style={{ width: "100%" }}
              >
                <InfoCircle className="me-2" />
                Show Tutorial
              </Button>
            </OverlayTrigger>
          </Col>

          <Col xs={12} sm={4} md={6} className="mt-2">
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>Share your story with friends and family.</Tooltip>
              }
            >
              <Button
                variant="warning"
                onClick={handleShare}
                style={{ width: "100%" }}
              >
                <Share className="me-2" />
                Share your Story
              </Button>
            </OverlayTrigger>
          </Col>
        </Row>
      </div>

      <StoryDisplay story={story} inputs={inputs} focusedInput={focusedInput} />

      <FAQsAndHelp />

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
