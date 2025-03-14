import { z } from "zod";
import { Content } from "../models/content.model";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { contentTypes } from "../utils/utilities";

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
    type: z.enum(["image", "video", "article", "audio", "youtube", "tweet"]),
    title: z.string().min(1, "Title is required"),
    tags: z.string().array().optional(), // or z.array(z.string());
  });

  const { error, data } = contentSchema.safeParse(req.body);

  if (error) throw new ApiError(400, "Please provide the required fields");

  await Content.create({
    ...data,
    user: req.user._id,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, null, "Content added successfully!"));
});

export const removeContent = asyncHandler(async (req, res, next) => {
  const { contentId } = req.params;

  // Logged In user can delete his own content only
  await Content.deleteOne({
    _id: contentId,
    user: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(201, null, "Content deleted successfully!"));
});
