// src/utils/api.js

import axios from "axios";

const openaiAPI = axios.create({
  baseURL: "https://api.openai.com/v1/chat/completions",
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export const generateStory = async () => {
  try {
    let prompts = [
      {
        role: "system",
        content:
          "This prompt is for use in a mad-lib game, the response should be a short story with the nouns, verbs, adjectives and adverds missing and replaced with placeholders that will be filled in later, only use the following place holders: [noun], [verb], [adjective], [adverb]",
      },
      {
        role: "user",
        content: "Generate a 100 word story",
      },
    ];
    const response = await openaiAPI.post("", {
      model: "gpt-3.5-turbo",
      messages: prompts,
      max_tokens: 300,
    });
    //console.log(response.data.choices[0].message.content);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(`Error generating random words:`, error);
    return "";
  }
};

let lastResponseToRandomWords = "";

export const generateRandomWords = async () => {
  try {
    let prompts = [
      {
        role: "system",
        content:
          "This prompt is for use in a mad-lib game, reponse with only the required format, no extra detail or response needed. make sure to replace each word in the format with a sutable random single word, do not return the values as passed, no numbers or punctuation, return a single response",
      },
      {
        role: "user",
        content:
          "generate 4 random single words in the following format: noun|verb|adjective|adverb",
      },
    ];
    if (lastResponseToRandomWords) {
      prompts[1].content +=
        ", make sure the response is different from: " +
        lastResponseToRandomWords;
    }
    const response = await openaiAPI.post("", {
      model: "gpt-3.5-turbo",
      messages: prompts,
      max_tokens: 20,
    });
    lastResponseToRandomWords = response.data.choices[0].message.content;
    return lastResponseToRandomWords.split("|");
  } catch (error) {
    console.error(`Error generating random words:`, error);
    return "";
  }
};
