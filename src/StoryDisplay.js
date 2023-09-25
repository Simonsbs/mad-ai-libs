import React from "react";
import { Card } from "react-bootstrap";

const StoryDisplay = ({ story, inputs, focusedInput }) => {
  const replacePlaceholderWithInput = (placeholder) => {
    const key = placeholder.slice(1, -1);
    const styles = getPlaceholderStyle(key);

    const displayNameParts = key.split(/(?=[0-9])/);

    return (
      <span
        style={{
          ...styles,
          display: "inline-block",
          position: "relative",
          bottom: "-0.1em",
          marginLeft: "5px",
          marginRight: "5px",
        }}
        key={key}
      >
        <div
          style={{
            borderBottom: "1px solid black",
            minWidth: "80px",
            lineHeight: "100%",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {inputs[key] ? inputs[key] : <>&nbsp;</>}
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
          {displayNameParts[0]}&nbsp;{displayNameParts[1]}
        </div>
      </span>
    );
  };

  const getPlaceholderStyle = (key) => {
    const wordType = key.match(/[a-zA-Z]+/)[0];
    const colors = {
      noun: "lightblue",
      verb: "lightgreen",
      adjective: "lightcoral",
      adverb: "yellow",
    };

    if (key === focusedInput) {
      return {
        backgroundColor: colors[wordType],
        borderRadius: "4px",
      };
    }
    return {};
  };

  const parseStory = () => {
    return story.split(/(\[[a-z]+\d+\])/).map((part, index) => {
      if (part.startsWith("[") && part.endsWith("]")) {
        return <span key={index}>{replacePlaceholderWithInput(part)}</span>;
      }
      return part;
    });
  };

  return (
    <Card className="mt-5">
      <Card.Header
        className="text-center"
        style={{ backgroundColor: "#e2e8f0" }}
      >
        Your Story
      </Card.Header>
      <Card.Body style={{ backgroundColor: "#edf2f7" }}>
        <div style={{ lineHeight: "280%", fontSize: "1.1em" }}>
          {parseStory()}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoryDisplay;
