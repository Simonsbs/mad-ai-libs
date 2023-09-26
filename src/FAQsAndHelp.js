import { useState } from "react";
import { Accordion } from "react-bootstrap";

const FAQsAndHelp = () => {
  const [activeKey, setActiveKey] = useState(null);

  const faqs = [
    {
      question: "How does AI MadLibs work?",
      answer:
        "AI MadLibs uses advanced artificial intelligence to generate dynamic stories based on the words you provide.",
    },
    {
      question: "Why are there different types of words?",
      answer:
        "Different word types like nouns, verbs, and adjectives play unique roles in the sentence structure, making the story more coherent and fun.",
    },
    {
      question: "What if I can't think of a word?",
      answer:
        "No worries! Just click the 'Fill Randomly' button, and AI will fill in words for you.",
    },
    {
      question: "Can I reuse or share the generated stories?",
      answer:
        "Absolutely! Feel free to share your unique tales with friends and family.",
    },
    {
      question: "Are the stories generated always unique?",
      answer:
        "Yes, due to the dynamic nature of AI, the stories crafted are typically unique, especially when you provide different words.",
    },
    {
      question: "Is there a limit to how many stories I can generate?",
      answer:
        "No, there's no limit! You can generate as many stories as you like and have fun experimenting with different words.",
    },
    {
      question: "Can I input inappropriate or offensive words?",
      answer:
        "While the system allows any input, we encourage users to refrain from using inappropriate or offensive language to ensure a fun and positive experience for all.",
    },
    {
      question: "Why do some generated stories not make sense?",
      answer:
        "The AI does its best to craft coherent tales based on your inputs, but occasionally, the combination of words might result in unexpected or nonsensical outcomes. It's all part of the fun!",
    },
    {
      question: "Do I need an internet connection to use AI MadLibs?",
      answer:
        "Yes, since the story generation process is powered by AI on our servers, an active internet connection is required.",
    },
    {
      question: "How do I share my story with others?",
      answer:
        "After generating a story, click the 'Share your Story' button. This will provide you a link that you can share with others.",
    },
    {
      question: "Is AI MadLibs safe for children?",
      answer:
        "Yes, AI MadLibs is designed to be family-friendly. However, as with all online activities, parental supervision is advised.",
    },
    {
      question: "Do you store or share the words I input?",
      answer:
        "No, your inputs and generated stories are not stored permanently or shared with third parties. Your privacy is important to us.",
    },
  ];

  return (
    <Accordion activeKey={activeKey} onSelect={(e) => setActiveKey(e)}>
      {faqs.map((faq, index) => (
        <Accordion.Item eventKey={index} key={index}>
          <Accordion.Header>{faq.question}</Accordion.Header>
          <Accordion.Body>{faq.answer}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
export default FAQsAndHelp;
