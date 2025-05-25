import { QdrantVectorStore } from "@langchain/qdrant";
import { embeddings, VECTOR_STORE_COLLECTION_NAME } from "../constants";
import { QDRANT_URL } from "../config";

let vectorStore: QdrantVectorStore;

export const initializeVectorStore = async () => {
  try {
    if (!vectorStore) {
      vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
        url: QDRANT_URL,
        collectionName: VECTOR_STORE_COLLECTION_NAME,
      });
      console.log("✅ Qdrant Vector Store initialized");
    }
    return vectorStore;
  } catch (err) {
    console.log("Error in initializing Qdrant vector store", err);
    throw new Error("Error in initializing Qdrant vector store");
  }
};

export const getVectorStore = () => {
  if (!vectorStore) {
    throw new Error("❌ Vector store is not initialized yet!");
  }
  return vectorStore;
};
