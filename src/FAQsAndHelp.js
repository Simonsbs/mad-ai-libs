import { useState } from "react";
import { Accordion, Button, Card } from "react-bootstrap";

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
  ];

  return (
    <Card className="mt-4 shadow-sm">
      <Card.Header>
        <h5>FAQs & Help</h5>
      </Card.Header>
      <Accordion activeKey={activeKey} onSelect={(e) => setActiveKey(e)}>
        {faqs.map((faq, index) => (
          <Accordion.Item eventKey={index} key={index}>
            <Accordion.Header>{faq.question}</Accordion.Header>
            <Accordion.Body>{faq.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Card>
  );
};
export default FAQsAndHelp;
