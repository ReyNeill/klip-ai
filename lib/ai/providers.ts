import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { openai } from "@ai-sdk/openai";
import { fireworks } from "@ai-sdk/fireworks";
import { google } from "@ai-sdk/google";
import { isTestEnvironment } from "../constants";
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from "./models.test";

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        "chat-model-small": chatModel,
        "chat-model-large": chatModel,
        "chat-model-reasoning": reasoningModel,
        "title-model": titleModel,
        "artifact-model": artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        "chat-model-small": google("gemini-2.0-flash"),
        "chat-model-large": google("gemini-2.0-flash"),
        "chat-model-reasoning": wrapLanguageModel({
          model: google("gemini-2.0-flash"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": google("gemini-2.0-flash"),
        "artifact-model": google("gemini-2.0-flash"),
      },
      imageModels: {
        "small-model": openai.image("dall-e-2"),
        "large-model": openai.image("dall-e-3"),
      },
    });
