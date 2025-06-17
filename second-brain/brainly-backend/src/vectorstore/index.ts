import axios from "axios";
import { QdrantVectorStore } from "@langchain/qdrant";
import { embeddings, VECTOR_STORE_COLLECTION_NAME } from "../constants";
import { QDRANT_API_KEY, QDRANT_CLOUD_URL } from "../config";

let vectorStore: QdrantVectorStore;

const collectionExists = async (collectionName: string) => {
  try {
    const response = await axios.get(
      `${QDRANT_CLOUD_URL}/collections/${collectionName}/exists`,
      {
        headers: { "api-key": QDRANT_API_KEY },
      }
    );
    return response.data.result.exists;
  } catch (err) {
    console.error("Error checking collection existence", err);
    return false;
  }
};

// If collection doesn't exists, create it dynamically
const createCollection = async (collectionName: string) => {
  try {
    await axios.put(
      `${QDRANT_CLOUD_URL}/collections/${collectionName}`,
      {
        vectors: {
          size: 1536,
          distance: "Cosine",
        }, // Adjust size & metric as needed
      },
      {
        headers: { "api-key": QDRANT_API_KEY },
      }
    );
    console.log(`✅ Collection ${collectionName} created`);
  } catch (err) {
    console.error("Error creating collection", err);
  }
};

export const initializeVectorStore = async () => {
  try {
    // return if already initialized
    if (vectorStore) return vectorStore;

    const exists = await collectionExists(VECTOR_STORE_COLLECTION_NAME);

    if (!exists) {
      console.log(
        `⚠️ Collection ${VECTOR_STORE_COLLECTION_NAME} not found, creating...`
      );
      await createCollection(VECTOR_STORE_COLLECTION_NAME);
    }

    vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
      url: QDRANT_CLOUD_URL,
      apiKey: QDRANT_API_KEY,
      collectionName: VECTOR_STORE_COLLECTION_NAME,
    });
    console.log("✅ Qdrant Vector Store initialized");

    // Create indexes after initialization
    await axios.put(
      `${QDRANT_CLOUD_URL}/collections/${VECTOR_STORE_COLLECTION_NAME}/index`,
      {
        field_name: "metadata.userId",
        field_schema: "keyword",
      },
      {
        headers: { "api-key": QDRANT_API_KEY },
      }
    );

    await axios.put(
      `${QDRANT_CLOUD_URL}/collections/${VECTOR_STORE_COLLECTION_NAME}/index`,
      {
        field_name: "metadata.contentId",
        field_schema: "keyword",
      },
      {
        headers: { "api-key": QDRANT_API_KEY },
      }
    );

    console.log(
      "✅ Indexes created for metadata.userId and metadata.contentId"
    );
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
