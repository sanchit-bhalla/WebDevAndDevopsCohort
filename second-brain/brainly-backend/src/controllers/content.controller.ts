import { z } from "zod";
import { Content } from "../models/content.model";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { contentTypes } from "../utils/utilities";
import { upload } from "../middlewares/multer.middleware";
import { fileUploadQueue } from "../queues/fileUploadQueue";
import { UploadApiResponse } from "cloudinary";
import {
  extractPublicIdFromLink,
  getThumbnailFromFile,
  removeFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary";

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

export const handleOptionalFileUploadLocally = asyncHandler(
  async (req, res, next) => {
    // Middleware wrapper to handle file upload conditionally
    upload.single("uploaded_file")(req, res, (err) => {
      if (err) {
        throw new ApiError(400, "File upload error");
      }
      console.log("No ERROR while uploading");
      next();
    });
  }
);

export const addContent = asyncHandler(async (req, res, next) => {
  const contentSchema = z.object({
    link: z.string().min(1, "link is required")?.optional(),
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
    tags: z.string().array().optional(), // or z.array(z.string());
  });

  const parsedBody = {
    ...req.body,
    tags: req.body?.tags ? JSON.parse(req.body.tags) : [], // Convert string to array
  };

  if (req.file) delete parsedBody.link;

  const { error, data } = contentSchema.safeParse(parsedBody);

  if (error) throw new ApiError(400, "Please provide the required fields");

  if (parsedBody.type === "pdf" || parsedBody.type === "text") {
    const localFilePath = req.file?.path;
    if (!localFilePath) throw new ApiError(400, "File is misssing");

    // TODO : Remove /* */ After testing
    /*
    const cloudinaryFile: UploadApiResponse | null = await uploadOnCloudinary(
      localFilePath
    );
    // console.log(cloudinaryFile);

    if (!cloudinaryFile)
      throw new ApiError(400, "Error occured while uploading File to cloud");

    // public_id is of form 'jd5hoprqerhzp1ocpyxa.txt'
    // const thumbnail = await getThumbnailFromFile(cloudinaryFile.public_id);

    parsedBody.link = cloudinaryFile.secure_url;
    */

    // TODO: Remove dummy-link after uncommenting above code
    parsedBody.link = "dummy-link";

    // Add file in queues so that worker can take it
    // do necessary processing for RAG
    await fileUploadQueue.add(
      "file-ready",
      JSON.stringify({
        // filename: req.file?.originalname,
        // destination: req.file?.destination,
        path: req.file?.path,
        mimetype: req.file?.mimetype,
        title: parsedBody.title,
        link: parsedBody.link,
        userId: req.user._id.toString(),
      })
    );
  }

  if (parsedBody.type === "youtube") {
    // Add youtube video URL in queue so that worker can take it
    // do necessary processing for RAG
    await fileUploadQueue.add(
      "file-ready",
      JSON.stringify({
        // filename: "youtubeFile",
        // destination: "youtube server",
        path: parsedBody.link,
        mimetype: "youtube",
        title: parsedBody.title,
        link: parsedBody.link,
        userId: req.user._id.toString(),
      })
    );
  }

  await Content.create({
    ...parsedBody,
    user: req.user._id,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, null, "Content added successfully!"));
});

export const removeContent = asyncHandler(async (req, res, next) => {
  const { contentId } = req.params;

  const content = await Content.findById(contentId);

  if (!content) throw new ApiError(400, "Invalid Id");

  if (content.type === "pdf" || content.type === "text") {
    const public_id = extractPublicIdFromLink(content.link);

    if (!public_id) throw new ApiError(400, "Invalid public Id");

    // remove file from cloudinary
    await removeFromCloudinary(
      public_id,
      content.type === "text" ? "raw" : "image"
    );
  }

  // Logged In user can delete his own content only
  await Content.deleteOne({
    _id: contentId,
    user: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(201, null, "Content deleted successfully!"));
});
