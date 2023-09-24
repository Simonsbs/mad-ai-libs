// src/utils/api.js

import axios from "axios";

const openaiAPI = axios.create({
  baseURL: "https://api.openai.com/v1/chat/completions",
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export const generateStory = async (storyLength) => {
  let prompts = [
    {
      role: "system",
      content:
        "This prompt is for use in a mad-lib game, the response should be a short story with the nouns, verbs, adjectives and adverds missing and replaced with placeholders that will be filled in later, only use the following place holders: [noun#], [verb#], [adjective#], [adverb#] where # represents the unique id of the placeholder",
    },
    {
      role: "user",
      content: `Generate a ${storyLength} word mad-lib story`,
    },
  ];
  const response = await openaiAPI.post("", {
    model: "gpt-3.5-turbo",
    messages: prompts,
    max_tokens: 500,
  });
  return response.data.choices[0].message.content;
};

let lastResponseToRandomWords = "";

export const generateRandomWords = async (placeholders) => {
  try {
    const format = placeholders.join("|");

    let prompts = [
      {
        role: "system",
        content:
          "This prompt is for use in a mad-lib game. Respond with only the required format, no extra detail or response needed. Make sure to replace each word in the format with a suitable random single word. Do not return the values as passed, no numbers or punctuation, return a single response.",
      },
      {
        role: "user",
        content: `generate random single words in the following format: ${format}`,
      },
    ];

    if (lastResponseToRandomWords) {
      prompts[1].content += `, make sure the response is different from: ${lastResponseToRandomWords}`;
    }

    const response = await openaiAPI.post("", {
      model: "gpt-3.5-turbo",
      messages: prompts,
      max_tokens: 150,
    });

    lastResponseToRandomWords = response.data.choices[0].message.content;
    const words = lastResponseToRandomWords.split("|");
    const result = {};

    for (let i = 0; i < placeholders.length; i++) {
      result[placeholders[i]] = words[i];
    }

    return result;
  } catch (error) {
    console.error(`Error generating random words:`, error);
    return {};
  }
};
