import "dotenv/config";
import axios from "axios";
import pdfParse from "pdf-parse";
import { parentPort } from "worker_threads";
import { customQueue } from "../queues/CustomQueue";
import { Document } from "langchain/document";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { getVectorStore, initializeVectorStore } from "../vectorstore";
import { imagekit } from "../constants";

// Separately initialized vector store in worker
(async () => {
  try {
    await initializeVectorStore();
    console.log("✅ Vector store initialized in worker");
  } catch (err) {
    console.error("❌ Failed to initialize vector store in worker", err);
  }
})();

async function removeFromVectorStore(job: RemoveJob) {
  try {
    const vectorStore = getVectorStore();

    await vectorStore.delete({
      filter: {
        must: [
          {
            key: "metadata.contentId",
            match: {
              value: job.contentId,
            },
          },
        ],
      },
    });
  } catch (err) {
    console.log("Error in removing content from vector store");
  }

  // Remove file from imagekit
  if (job.fileId) {
    try {
      await imagekit.deleteFile(job.fileId);
    } catch (error) {
      console.log("Error occured in deleting file from imagekit: ", error);
    }
  }
}

async function addIntoVectorStore(job: IndexingVectorStore) {
  try {
    let docs = null;
    if (job.mimetype === "application/pdf") {
      // const loader = new PDFLoader(job.path);
      // docs = await loader.load();

      const response = await axios.get(job.link, {
        responseType: "arraybuffer",
      }); // Get raw PDF data
      const pdfData = await pdfParse(response.data); // Extract text from PDF
      docs = [new Document({ pageContent: pdfData.text })]; // Store as LangChain Document
    } else if (job.mimetype === "text/plain") {
      // const loader = new TextLoader(job.path);
      // docs = await loader.load();
      const response = await axios.get(job.link, { responseType: "text" }); // Get text content
      docs = [new Document({ pageContent: response.data })];
    } else if (job.mimetype === "youtube") {
      // job.path represents youtube video url
      const loader = YoutubeLoader.createFromUrl(job.path, {
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
      // Docs with metadata - Useful when later we want to search results
      // based on specific user documents only
      const enrichedDocs = splitDocs.map((doc) => ({
        ...doc,
        metadata: {
          ...(doc.metadata || {}),
          contentId: job.contentId,
          userId: job.userId,
          title: job.title,
          link: job.link,
          mimetype: job.mimetype,
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

      console.log(`${job.title} added to vector store`);
    }
  } catch (err) {
    console.log(`Error while processing job: ${job.title}`, err);
  }
}

async function processJob(job: JobData) {
  console.log(`Processing job: ${job.title}`);

  if (job.type === "add") await addIntoVectorStore(job);
  else if (job.type === "remove") await removeFromVectorStore(job);
}

// Graceful shutdown flag
let shouldExit = false;

async function startWorker() {
  while (!shouldExit) {
    // console.log("Worker running...");
    if (!customQueue.isEmpty()) {
      const job = customQueue.dequeue();
      if (job) await processJob(job);
    }

    // short delay to avoid CPU overload
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  console.log("Worker stopped");
}

// Listen messages from main thread (controller)
parentPort?.on("message", (job: JobData | string) => {
  if (typeof job === "string" && job === "end") {
    console.log("Stopping worker...");
    shouldExit = true;
    process.exit(0);
  } else if (typeof job !== "string") {
    console.log("Job received by worker, adding it to queue");
    customQueue.enqueue(job);
  }
});

startWorker();
console.log("Worker started...");

// Use termination signals like SIGINT(CTRL + C) to stop
// stop process using CTRL+C or kill <pid>
// It cleans up resources before exiting.
process.on("SIGINT", () => {
  console.log("Stopping worker...");
  shouldExit = true;
  process.exit(0);
});
