import { z } from "zod";
import { Content } from "../models/content.model";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

export const getAllContents = asyncHandler(async (req, res, next) => {
  const contents = await Content.find({ userId: req.user?._id })
    .populate({
      path: "tags",
      select: "title",
    })
    .populate({
      path: "userId",
      select: "username",
    });

  return res.status(200).json(new ApiResponse(200, contents));
});

export const addContent = asyncHandler(async (req, res, next) => {
  const contentSchema = z.object({
    link: z.string().min(1, "link is required"),
    type: z.enum(["image", "video", "article", "audio"]),
    title: z.string().min(1, "Title is required"),
    tags: z.string().array(), // or z.array(z.string());
  });

  const { error, data } = contentSchema.safeParse(req.body);

  if (error) throw new ApiError(400, "Please provide the required fields");

  await Content.create({
    ...data,
    userId: req.user._id,
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
    userId: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(201, null, "Content deleted successfully!"));
});
