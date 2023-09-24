import React from "react";
import { Form, Col } from "react-bootstrap";

const InputField = ({ name, onChange, value, onFocus, onBlur }) => {
  const displayName = `${name.split(/(?=[0-9])/).join(" ")}`;
  const wordType = name.match(/[a-zA-Z]+/)[0];

  const colors = {
    noun: "lightblue",
    verb: "lightgreen",
    adjective: "lightcoral",
    adverb: "lightgoldenrodyellow",
  };

  return (
    <Form.Group as={Col} xs="6" md="3" className="mb-3">
      <Form.Label>
        {displayName.charAt(0).toUpperCase() + displayName.slice(1)}
      </Form.Label>
      <Form.Control
        type="text"
        placeholder={`Enter a ${wordType}`}
        name={name}
        onChange={onChange}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{ backgroundColor: colors[wordType] }}
      />
    </Form.Group>
  );
};

export default InputField;
