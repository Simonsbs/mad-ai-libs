import { InfoCircle } from "react-bootstrap-icons";

function HowToUse() {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h5>
          <InfoCircle className="me-2" />
          How to use Mad-A.I.-Libs Fun:
        </h5>
      </div>

      <ul>
        <li>
          <strong>Placeholders:</strong> Each story has placeholders marked
          within square brackets (e.g., [noun1], [verb2]). These are spots where
          you fill in the appropriate type of word to complete the story.
        </li>
        <li>
          <strong>Story Length:</strong> Adjust the slider to customize the
          length of the story you wish to generate. A longer setting will
          provide a more detailed story.
        </li>
        <li>
          <strong>Generate Story:</strong> Click this button, and the AI will
          craft a unique narrative for you based on your chosen story length.
        </li>
        <li>
          <strong>Fill Randomly:</strong> If you're unsure what words to use or
          just want a surprise, this button will randomly select words for each
          placeholder.
        </li>
        <li>
          <strong>Contextual Fill:</strong> This uses AI to analyze the context
          of the story and fill placeholders with words that fit best.
        </li>
        <li>
          <strong>Reset Inputs:</strong> Clears only the words you've inputted,
          leaving the story template intact.
        </li>
        <li>
          <strong>Reset Everything:</strong> Clears both your inputs and the
          story template, allowing you to start from scratch.
        </li>
        <li>
          <strong>Show Tutorial:</strong> Displays an onboarding tutorial,
          guiding you through the main features of Mad-A.I.-Libs Fun.
        </li>
        <li>
          <strong>Share your Story:</strong> Generate a unique link to share
          your created story with friends or on social media. Everyone with the
          link can view the story you crafted with the words you chose.
        </li>
      </ul>
    </>
  );
}

export default HowToUse;
