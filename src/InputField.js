import React from "react";
import { Form, Col } from "react-bootstrap";

const InputField = ({ name, onChange, value, onFocus, onBlur }) => {
  const displayName = `${name.split(/(?=[0-9])/).join(" ")}`;
  const wordType = name.match(/[a-zA-Z]+/)[0];

  const colors = {
    noun: "lightblue",
    verb: "lightgreen",
    adjective: "lightcoral",
    adverb: "yellow",
  };

  const exampleWords = {
    noun: "dog, city, car",
    verb: "run, eat, jump",
    adjective: "happy, blue, tall",
    adverb: "quickly, loudly, softly",
  };

  const handleInputChange = (event) => {
    const { value } = event.target;

    if (/^[a-zA-Z]*$/.test(value)) {
      onChange(event);
    }
  };

  return (
    <Form.Group as={Col} xs="6" md="3" className="mb-3">
      <Form.Label htmlFor={name}>
        {displayName.charAt(0).toUpperCase() + displayName.slice(1)}
      </Form.Label>
      <Form.Control
        type="text"
        maxLength="20"
        placeholder={`e.g. ${exampleWords[wordType]}`}
        name={name}
        onChange={handleInputChange}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{ backgroundColor: colors[wordType] }}
        aria-label={`Enter a ${wordType}`}
        id={name}
      />
    </Form.Group>
  );
};

export default InputField;
