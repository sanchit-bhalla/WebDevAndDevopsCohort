import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { IMAGEKIT_PUBLIC_KEY } from "../config";
import { imagekit } from "../constants";

export const getAuthParameters = asyncHandler(async (req, res, next) => {
  const authParams = imagekit.getAuthenticationParameters(); // { token, expire, signature }

  return res
    .status(200)
    .json(new ApiResponse(200, { authParams, publicKey: IMAGEKIT_PUBLIC_KEY }));
});

export const deleteFile = asyncHandler(async (req, res, next) => {
  const { fileId } = req.body;

  if (!fileId) throw new ApiError(400, "Invalid fileId");

  try {
    const result = await imagekit.deleteFile(fileId);
    // console.log("File deleted successfully:", result);
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "File deleted successfully"));
  } catch (error) {
    // console.log("Error occured in deleting file: ", error);
    throw new ApiError(500, "Error occured in deleting file");
  }
});
