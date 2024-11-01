const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/ApiError");
const { asyncHandler } = require("../utils/asyncHandler");
const { USER_ACCESS_TOKEN_SECRET } = require("../config");

const verifyUserJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) throw new ApiError(401, "Unauthorized request!");

    const decodedTokenJwt = jwt.verify(token, USER_ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedTokenJwt?._id).select(
      "-password -refreshToken"
    );

    if (!user) throw new ApiError(401, "Invallid Access Token");

    req.user = user;
    next();
  } catch (err) {
    throw new ApiError(401, err?.message || "Invalid access token");
  }
});

module.exports = { verifyUserJWT };
