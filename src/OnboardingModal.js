// src/components/OnboardingModal.js

import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const steps = [
  {
    title: "Welcome to AI-Libs Fun!",
    content:
      "Craft spontaneous stories with the power of AI. Let's get you started!",
  },
  {
    title: "Choose Story Length",
    content:
      "Use the story length slider to determine how long your generated story will be.",
  },
  {
    title: "Fill in the Words",
    content:
      "Fill in the nouns, verbs, adjectives, and adverbs in the provided fields.",
  },
  {
    title: "Generate & Enjoy",
    content:
      "Once you've added your words, press 'Generate Story' to see the magic happen!",
  },
];

const OnboardingModal = ({ forceShow, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [show, setShow] = useState(() => {
    if (forceShow) return true;
    return !localStorage.getItem("hasSeenTutorial");
  });

  useEffect(() => {
    if (forceShow) {
      setShow(true);
    } else {
      const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");
      if (!hasSeenTutorial) {
        setShow(true);
        localStorage.setItem("hasSeenTutorial", "true");
      }
    }
  }, [forceShow]);

  const handleClose = () => {
    setShow(false);
    if (!localStorage.getItem("hasSeenTutorial")) {
      localStorage.setItem("hasSeenTutorial", "true");
    }
    if (onClose) onClose();
  };

  const handleNext = () => setCurrentStep(currentStep + 1);
  const handlePrev = () => setCurrentStep(currentStep - 1);

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{steps[currentStep].title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{steps[currentStep].content}</Modal.Body>
      <Modal.Footer>
        {currentStep > 0 && (
          <Button variant="secondary" onClick={handlePrev}>
            Previous
          </Button>
        )}
        {currentStep < steps.length - 1 ? (
          <Button variant="primary" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button variant="success" onClick={handleClose}>
            Got it!
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default OnboardingModal;
