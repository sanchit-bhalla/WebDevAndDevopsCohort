import ImageKit from "imagekit";
import OpenAI from "openai";
import { OpenAIEmbeddings } from "@langchain/openai";
import {
  IMAGEKIT_PRIVATE_KEY,
  IMAGEKIT_PUBLIC_KEY,
  IMAGEKIT_URL_ENDPOINT,
  OPENAI_API_KEY,
} from "./config";

export const DB_NAME = "brainly";

export const FILE_UPLOAD_QUEUE = "file-upload-queue";

export const imagekit = new ImageKit({
  urlEndpoint: IMAGEKIT_URL_ENDPOINT || "",
  publicKey: IMAGEKIT_PUBLIC_KEY || "",
  privateKey: IMAGEKIT_PRIVATE_KEY || "",
});

export const VECTOR_STORE_COLLECTION_NAME = "brainly_rag";

export const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
  apiKey: OPENAI_API_KEY,
});

export const OPENAI_CLIENT = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export const DEVELOPER_PROMPT = `# Identity

You are helfull AI Assistant who answeres the user query based on the available context provided. Please provide to the point answer. Don't use more than 2-3 sentances to answer unless explicitly asked by user. If you don't have the answer based on the provided context, return this text "Sorry, I don't have the context."

# Context

`;
