import crypto from "crypto";
import { Link } from "../models/link.model";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { HASH_SECRET } from "../config";
import { ApiError } from "../utils/ApiError";
import { Content } from "../models/content.model";

const generateUniqueHash = function (userId: string) {
  const hash = crypto.createHmac("sha256", HASH_SECRET as string);
  hash.update(userId + Date.now().toString());
  return hash.digest("hex");
};

export const brainStatus = asyncHandler(async (req, res, next) => {
  const existingLink = await Link.findOne({ userId: req.user._id });
  if (existingLink) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, { isPublished: true }, "Link Already published")
      );
  } else {
    return res
      .status(200)
      .json(new ApiResponse(200, { isPublished: false }, "Link not published"));
  }
});

// verify if the hash belongs to logged in user or not
export const verifyHash = asyncHandler(async (req, res, next) => {
  const { hash } = req.body;

  if (!hash)
    return res.status(400).json(new ApiResponse(400, null, "Invalid hash"));

  // check if any Link present
  const link = await Link.findOne({
    userId: req.user?._id,
    hash,
  });

  if (link) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { verified: true },
          "Hash belongs to the LoggedIn user"
        )
      );
  } else {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { verified: false },
          "Hash doesn't belongs to the LoggedIn user"
        )
      );
  }
});

export const shareBrain = asyncHandler(async (req, res, next) => {
  const { share } = req.body;
  if (share) {
    const existingLink = await Link.findOne({ userId: req.user._id });

    if (existingLink)
      return res
        .status(200)
        .json(new ApiResponse(200, { hash: existingLink.hash }));

    const hash = generateUniqueHash(req?.user?._id?.toString());

    // Create new Link
    await Link.create({
      hash,
      userId: req?.user?._id,
    });

    return res.status(200).json(new ApiResponse(200, { hash }));
  } else {
    // unpublish the Link
    await Link.deleteOne({
      userId: req?.user?._id,
    });

    return res.status(200).json(new ApiResponse(200, null, "Link removed"));
  }
});

export const brainContent = asyncHandler(async (req, res, next) => {
  const hash = req.params.shareLink;

  const link = await Link.findOne({
    hash,
  });
  if (!link) throw new ApiError(404, "URL not exist");

  // If link exists, get userId from it and return the brain of that user
  const contents = await Content.find({
    userId: link.userId,
  });

  return res.status(200).json(new ApiResponse(200, contents));
});
