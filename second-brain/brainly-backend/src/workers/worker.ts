import "dotenv/config";
import fs from "fs";
import { Worker } from "bullmq";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { QdrantVectorStore } from "@langchain/qdrant";
import {
  embeddings,
  FILE_UPLOAD_QUEUE,
  VECTOR_STORE_COLLECTION_NAME,
} from "../constants";
import { QDRANT_URL, VALKEY_HOST, VALKEY_PORT } from "../config";
import { getVectorStore, initializeVectorStore } from "../vectorstore";

interface JobData {
  // filename: string;
  // destination: string;
  path: string;
  mimetype: "application/pdf" | "text/plain" | "youtube";
  title: string;
  link: string;
  userId: string;
}

// Separately initialized vector store in worker bcz we run it independently
(async () => {
  try {
    await initializeVectorStore();
    console.log("✅ Vector store initialized in worker");
  } catch (err) {
    console.error("❌ Failed to initialize vector store in worker", err);
  }
})();

const worker = new Worker(
  FILE_UPLOAD_QUEUE,
  async (job) => {
    const data: JobData = JSON.parse(job.data);
    // console.log(data);

    /*
        1. Read the File from the path
        2. Split File into chunks
        3. Create Embedding of the chunks
        4. Store in Qdrant vector store

        Also remove(unlink) the file bcz we didn't remove it after uploading to cloudinary as we are using free clodinary account
    */

    let docs = null;

    if (data.mimetype === "application/pdf") {
      const loader = new PDFLoader(data.path);
      docs = await loader.load();
    } else if (data.mimetype === "text/plain") {
      const loader = new TextLoader(data.path);
      docs = await loader.load();
    } else if (data.mimetype === "youtube") {
      // data.path represents youtube video url
      const loader = YoutubeLoader.createFromUrl(data.path, {
        language: "en",
        addVideoInfo: true,
      });

      docs = await loader.load();
    }

    // console.log(docs?.[0]?.metadata);
    // console.log(docs?.length);

    // 2. Split docs into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const splitDocs = docs ? await textSplitter.splitDocuments(docs) : null;
    // console.log(splitDocs?.length);
    // console.log(splitDocs);

    // Step3,4. Create Embeddings and store it in vector store
    if (splitDocs) {
      try {
        // Docs with metadata - Useful when later we want to search results
        // based on specific user documents only
        const enrichedDocs = splitDocs.map((doc) => ({
          ...doc,
          metadata: {
            ...(doc.metadata || {}),
            userId: data.userId,
            title: data.title,
            link: data.link,
            mimetype: data.mimetype,
          },
        }));

        // const vectorStore = await QdrantVectorStore.fromDocuments(
        //   enrichedDocs,
        //   embeddings,
        //   {
        //     url: QDRANT_URL,
        //     collectionName: VECTOR_STORE_COLLECTION_NAME,
        //   }
        // );

        const vectorStore = getVectorStore();
        await vectorStore.addDocuments(enrichedDocs);

        console.log(`${data.title} added to vector store`);
      } catch (err) {
        console.log("Error while storing data in vector store: ", err);
      }
    }

    // Remove/ Unlink file from server
    fs.unlinkSync(data.path);
  },
  {
    concurrency: 100,
    connection: {
      host: VALKEY_HOST,
      port: Number(VALKEY_PORT),
    },
  }
);
