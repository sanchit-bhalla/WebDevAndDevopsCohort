// import "../types/express/index.d.ts";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ACCESS_TOKEN_SECRET } from "../config";
import { User } from "../models/user.model";
import { DecodedTokenJwt } from "../types/DecodedTokenJwt";

export const VerifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) throw new ApiError(401, "Invalid Access Token");

    const decodedTokenJwt = jwt.verify(
      token,
      ACCESS_TOKEN_SECRET as string
    ) as DecodedTokenJwt;

    const user = await User.findById(decodedTokenJwt._id).select(
      "-password -refreshToken"
    );

    if (!user) throw new ApiError(401, "Invalid Access Token");

    req.user = user;
    next();
  } catch (err: any) {
    throw new ApiError(401, "Invalid Access Token");
  }
});
