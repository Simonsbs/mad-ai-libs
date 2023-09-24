import React from "react";
import { Form, Col } from "react-bootstrap";

const InputField = ({ name, onChange, value, onFocus, onBlur }) => {
  return (
    <Form.Group as={Col} xs="12" md="6" className="mb-3">
      <Form.Label>{name.charAt(0).toUpperCase() + name.slice(1)}</Form.Label>
      <Form.Control
        type="text"
        placeholder={`Enter a ${name}`}
        name={name}
        onChange={onChange}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </Form.Group>
  );
};

export default InputField;
