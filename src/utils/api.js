// src/utils/api.js

import axios from "axios";

const openaiAPI = axios.create({
  baseURL: "https://8h38f7e2z5.execute-api.us-east-1.amazonaws.com/dev/proxy",
  headers: {
    "Content-Type": "application/json",
  },
});

export const generateStory = async (storyLength) => {
  const response = await openaiAPI.post("generateStory", {
    storyLength,
  });
  return response.data;
};

let lastResponseToRandomWords = "";

export const generateRandomWords = async (placeholders) => {
  try {
    const response = await openaiAPI.post("generateRandomWords", {
      placeholders,
      lastResponseToRandomWords,
    });

    console.log(response.data);

    lastResponseToRandomWords = Object.values(response.data);

    return response.data;
  } catch (error) {
    console.error(`Error generating random words:`, error);
    return {};
  }
};

export const generateContextualWords = async (placeholders, story) => {
  try {
    const response = await openaiAPI.post("generateContextualWords", {
      placeholders,
      story,
    });

    return response.data;
  } catch (error) {
    console.error(`Error generating contextually appropriate words:`, error);
    return {};
  }
};
