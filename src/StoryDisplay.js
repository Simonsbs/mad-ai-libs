import React from "react";
import { Card } from "react-bootstrap";

const StoryDisplay = ({ story, inputs }) => {
  const replacePlaceholderWithInput = (placeholder) => {
    const key = placeholder.slice(1, -1);

    return (
      <span
        style={{
          display: "inline-block",
          position: "relative",
          bottom: "-0.1em",
          marginLeft: "2px",
          marginRight: "2px",
        }}
        key={key}
      >
        <div
          style={{
            borderBottom: "1px solid black",
            minWidth: "80px",
            lineHeight: "100%",
            textAlign: "center",
          }}
        >
          {inputs[key] ? inputs[key] : ""}
        </div>
        <div
          style={{
            fontSize: "0.7em",
            textAlign: "center",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: "-2.6em",
          }}
        >
          {key}
        </div>
      </span>
    );
  };

  const parseStory = () => {
    return story.split(/(\[[a-z]+\])/).map((part, index) => {
      if (part.startsWith("[") && part.endsWith("]")) {
        return <span key={index}>{replacePlaceholderWithInput(part)}</span>;
      }

      return part;
    });
  };

  return (
    <Card className="mt-4">
      <Card.Header className="text-center">Your Story</Card.Header>
      <Card.Body>
        <Card.Text style={{ lineHeight: "280%" }}>{parseStory()}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default StoryDisplay;
