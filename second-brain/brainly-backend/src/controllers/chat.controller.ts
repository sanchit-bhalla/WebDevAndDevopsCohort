import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

export const chatResponse = asyncHandler(async (req, res, next) => {
  const { query } = req.body;
  return res
    .status(200)
    .json(new ApiResponse(200, { response: "Hello, How can I help you" }));
});
