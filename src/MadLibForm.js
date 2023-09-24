import React, { useState } from "react";
import { Button, Row } from "react-bootstrap";
import InputField from "./InputField";
import StoryDisplay from "./StoryDisplay";
import { generateRandomWords, generateStory } from "./utils/api";

const MadLibForm = () => {
  const [inputs, setInputs] = useState({});
  const [story, setStory] = useState(null);

  const placeholders = ["noun", "verb", "adjective", "adverb"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateStory = async (e) => {
    e.preventDefault();
    const generatedStory = await generateStory(prompt);
    setStory(generatedStory);
  };

  const handleRandomFill = async () => {
    const results = await generateRandomWords();
    const randomInputs = {};
    for (let i = 0; i < placeholders.length; i++) {
      randomInputs[placeholders[i]] = results[i];
    }
    console.log(randomInputs);
    setInputs(randomInputs);
  };

  return (
    <div>
      <Row>
        {placeholders.map((placeholder, index) => (
          <InputField
            key={index}
            name={placeholder}
            value={inputs[placeholder] || ""}
            onChange={handleChange}
          />
        ))}
      </Row>
      <Button variant="primary" className="mt-3" onClick={handleGenerateStory}>
        Generate Story
      </Button>
      <Button
        variant="secondary"
        onClick={handleRandomFill}
        className="mt-3 ml-3"
      >
        Fill Randomly
      </Button>
      {story && <StoryDisplay story={story} inputs={inputs} />}
    </div>
  );
};

export default MadLibForm;
