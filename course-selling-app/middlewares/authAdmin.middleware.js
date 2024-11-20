const jwt = require("jsonwebtoken");
const { ApiError } = require("../utils/ApiError");
const { asyncHandler } = require("../utils/asyncHandler");
const { ADMIN_ACCESS_TOKEN_SECRET } = require("../config");
const { Admin } = require("../models/admin.model");

const verifyAdminJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) throw new ApiError(401, "Unauthorized request!");

    const decodedTokenJwt = jwt.verify(token, ADMIN_ACCESS_TOKEN_SECRET);

    const admin = await Admin.findById(decodedTokenJwt?._id).select(
      "-password -refreshToken"
    );

    if (!admin) throw new ApiError(401, "Invallid Access Token");

    req.user = admin;
    next();
  } catch (err) {
    throw new ApiError(401, err?.message || "Invalid access token");
  }
});

module.exports = { verifyAdminJWT };
