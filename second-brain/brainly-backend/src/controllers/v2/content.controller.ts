import path from "path";
import { Worker } from "worker_threads";
import { z } from "zod";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { Content } from "../../models/content.model";
import { contentTypes, getMimeType } from "../../utils/utilities";

const workerPath = path.resolve(__dirname, "../../workers/customQueueWorker");
const worker = new Worker(workerPath);

export const getAllContents = asyncHandler(async (req, res, next) => {
  const { q } = req.query;
  if (q && typeof q !== "string")
    throw new ApiError(400, "Invalid query parameters");

  const type = (q === "tweets" ? "tweet" : q) || "";

  const query = contentTypes.includes(type)
    ? { user: req.user?._id, type }
    : { user: req.user?._id };

  const contents = await Content.find(query)
    .sort({ createdAt: -1 })
    // .populate({
    //   path: "tags",
    //   select: "title",
    // })
    .populate({
      path: "user",
      select: "username",
    });

  return res.status(200).json(new ApiResponse(200, contents));
});

export const addContent = asyncHandler(async (req, res, next) => {
  const contentSchema = z.object({
    link: z.string().min(1, "link is required"),
    type: z.enum([
      "image",
      "video",
      "article",
      "audio",
      "youtube",
      "tweet",
      "pdf",
      "text",
    ]),
    title: z.string().min(1, "Title is required"),
    fileId: z.string().optional(),
    tags: z.string().array().optional(), // or z.array(z.string());
  });

  const parsedBody = {
    ...req.body,
    tags: req.body?.tags ? JSON.parse(req.body.tags) : [], // Convert string to array
  };

  const { error, data } = contentSchema.safeParse(parsedBody);

  if (error) throw new ApiError(400, "Please provide the required fields");

  const newContent = await Content.create({
    ...parsedBody,
    user: req.user._id,
  });

  if (
    parsedBody.type === "pdf" ||
    parsedBody.type === "text" ||
    parsedBody.type === "youtube"
  ) {
    // Add job in queue so that worker can take it
    // do necessary processing for RAG
    const jobData: JobData = {
      type: "add",
      contentId: newContent._id.toString(),
      path: parsedBody.link,
      mimetype: getMimeType(parsedBody.type),
      title: parsedBody.title,
      link: parsedBody.link,
      userId: req.user._id.toString(),
    };

    // send message to worker which will add it in queue and process
    worker.postMessage(jobData);

    // Add job to the queue
    // customQueue.enqueue(jobData);
    // console.log(`Job added: ${jobData.title}`);
  }

  return res
    .status(201)
    .json(new ApiResponse(201, null, "Content added successfully!"));
});

export const removeContent = asyncHandler(async (req, res, next) => {
  const { contentId } = req.params;

  const content = await Content.findById(contentId);

  if (!content) throw new ApiError(400, "Invalid Id");

  const fileId = content.fileId;

  // Logged In user can delete his own content only
  await Content.deleteOne({
    _id: contentId,
    user: req.user._id,
  });

  // remove embedding from vector store and remove file from imagekit
  worker.postMessage({
    type: "remove",
    title: content.title,
    contentId: contentId,
    fileId,
  });

  return res
    .status(200)
    .json(new ApiResponse(201, null, "Content deleted successfully!"));
});
