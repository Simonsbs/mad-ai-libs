import { Alert, Button } from "react-bootstrap";
import { InfoCircle, ChevronUp, ChevronDown } from "react-bootstrap-icons";
import { useState } from "react";

function HowToUse() {
  const [showInstructions, setShowInstructions] = useState(true);

  return (
    <Alert
      variant="info"
      className="mb-4"
      style={{ border: "1px solid #d1d5db" }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <h5>
          <InfoCircle className="me-2" />
          How to use:
        </h5>
        <Button
          variant="link"
          onClick={() => setShowInstructions(!showInstructions)}
        >
          {showInstructions ? "Hide" : "Show"}
          {showInstructions ? (
            <ChevronUp className="ms-2" />
          ) : (
            <ChevronDown className="ms-2" />
          )}
        </Button>
      </div>

      {showInstructions && (
        <ul>
          <li>
            Each placeholder word has a type (e.g., noun, verb). Fill in the
            appropriate word for each placeholder.
          </li>
          <li>
            Adjust the <strong>Story Length</strong> slider to customize the
            length of your generated story. The longer the length, the more
            detailed your story will be.
          </li>
          <li>
            Click the <strong>Generate Story</strong> button to create a unique
            story based on the words you provided.
          </li>
          <li>
            Not feeling creative? Click <strong>Fill Randomly</strong> to let
            the system choose random words for you.
          </li>
          <li>
            Want to start over? Click the <strong>Reset Everything</strong>{" "}
            button to clear all the fields and begin anew.
          </li>
        </ul>
      )}
    </Alert>
  );
}

export default HowToUse;
