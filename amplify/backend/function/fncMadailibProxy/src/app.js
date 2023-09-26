const axios = require("axios");

const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

const { SecretsManager } = require("aws-sdk");

async function getOpenAIKey() {
  const secretsManager = new SecretsManager();
  const secretData = await secretsManager
    .getSecretValue({ SecretId: "openai" })
    .promise();
  return JSON.parse(secretData.SecretString).SecretString;
}

app.use(function (req, res, next) {
  const allowedOrigins = ["https://bestdev.co.il", "https://mad-ai-libs.com"];

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin); // only set header for specific origins
    res.header("Access-Control-Allow-Headers", "*");
    next();
  } else {
    res.status(403).send("Access Denied");
  }
});

app.post("/proxy/generateStory", async function (req, res) {
  try {
    const openaiAPI = axios.create({
      baseURL: "https://api.openai.com/v1/chat/completions",
      headers: {
        Authorization: `Bearer ${await getOpenAIKey()}`,
        "Content-Type": "application/json",
      },
    });

    const { storyLength } = req.body;

    if (!storyLength || storyLength < 10 || storyLength > 200) {
      res.status(400).json({ error: "storyLength must be between 10 and 200" });
      return;
    }

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

    res.json(response.data.choices[0].message.content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/proxy/generateRandomWords", async function (req, res) {
  try {
    const openaiAPI = axios.create({
      baseURL: "https://api.openai.com/v1/chat/completions",
      headers: {
        Authorization: `Bearer ${await getOpenAIKey()}`,
        "Content-Type": "application/json",
      },
    });

    const { placeholders, lastResponseToRandomWords } = req.body;

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
      prompts[1].content += `, make sure the response is different from: ${lastResponseToRandomWords.join(
        "|"
      )}`;
    }

    const response = await openaiAPI.post("", {
      model: "gpt-3.5-turbo",
      messages: prompts,
      max_tokens: 150,
    });

    const words = response.data.choices[0].message.content.split("|");
    const result = {};

    for (let i = 0; i < placeholders.length; i++) {
      result[placeholders[i]] = words[i];
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/proxy/generateContextualWords", async function (req, res) {
  try {
    const openaiAPI = axios.create({
      baseURL: "https://api.openai.com/v1/chat/completions",
      headers: {
        Authorization: `Bearer ${await getOpenAIKey()}`,
        "Content-Type": "application/json",
      },
    });

    const { placeholders, story } = req.body;

    const placeholdersFormat = placeholders.join("|");
    const prompt = [
      {
        role: "system",
        content:
          "Given the provided story context with placeholders, your task is to generate contextually appropriate words for each placeholder. Make sure the words align with the story narrative.Respond with only the required format, no extra detail or response needed. Make sure to replace each word in the format with a suitable random single word. Do not return the values as passed, no numbers or punctuation, return a single response, dont return the story.",
      },
      {
        role: "user",
        content: `Story: \n******\n${story}\n*******\n Generate words for the placeholders in the following format exactly: ${placeholdersFormat}`,
      },
    ];

    const response = await openaiAPI.post("", {
      model: "gpt-3.5-turbo",
      messages: prompt,
      max_tokens: 300,
    });

    const wordsResponse = response.data.choices[0].message.content.split("|");
    const result = {};

    for (let i = 0; i < placeholders.length; i++) {
      result[placeholders[i]] = wordsResponse[i].trim();
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, function () {
  console.log("App started");
});
module.exports = app;
