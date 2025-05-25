import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { getVectorStore } from "../vectorstore";
import { DEVELOPER_PROMPT, OPENAI_CLIENT } from "../constants";

export const chatResponse = asyncHandler(async (req, res, next) => {
  const { prompt } = req.query;
  if (typeof prompt !== "string" || !prompt)
    throw new ApiError(400, "Invalid prompt");

  const userId = req?.user?._id?.toString();
  if (typeof userId !== "string" || !userId)
    throw new ApiError(400, "Invalid userId");

  const vectorStore = getVectorStore();

  const filter = {
    must: [{ key: "metadata.userId", match: { value: userId } }],
  };
  // console.log(JSON.stringify(filter));

  const similaritySearchResults = await vectorStore.similaritySearch(
    prompt,
    2,
    filter
  );
  // console.log("Number of results: ", similaritySearchResults.length);
  // console.log(similaritySearchResults);

  const retrievedResults = similaritySearchResults; // Your search results
  if (retrievedResults.length === 0) {
    return res.status(200).json(
      new ApiResponse(200, {
        references: [],
        response: "Sorry, I don't have the context.",
      })
    );
  }

  let content = ``;

  const uniqueSources = new Set();
  let uniqueReferences: any = [];

  retrievedResults.forEach((doc) => {
    content += `${doc.pageContent}`;

    const metadata = doc.metadata;
    if (metadata && !uniqueSources.has(metadata.source)) {
      uniqueSources.add(metadata.source);
      uniqueReferences.push({
        title: metadata.title,
        link: metadata.link,
        mimetype: metadata.mimetype,
      });
    }
  });

  const instructions = DEVELOPER_PROMPT + JSON.stringify(content);

  const response = await OPENAI_CLIENT.responses.create({
    model: "gpt-4.1",
    instructions,
    input: prompt,
  });

  if (response?.output_text === "Sorry, I don't have the context.")
    uniqueReferences = [];

  return res.status(200).json(
    new ApiResponse(200, {
      references: uniqueReferences,
      response: response.output_text,
    })
  );
});
