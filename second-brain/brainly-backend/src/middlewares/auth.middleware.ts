import "../types/express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ACCESS_TOKEN_SECRET } from "../config";
import { User } from "../models/user.model";

interface DecodeTokenJwt {
  _id: mongoose.Types.ObjectId | string;
}

export const VerifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) throw new ApiError(401, "Unauthorized request!");

    const decodedTokenJwt = jwt.verify(
      token,
      ACCESS_TOKEN_SECRET as string
    ) as DecodeTokenJwt;

    const user = await User.findById(decodedTokenJwt._id).select(
      "-password -refreshToken"
    );

    if (!user) throw new ApiError(401, "Invalid Access Token");

    req.user = user;
    next();
  } catch (err: any) {
    throw new ApiError(401, err?.message || "Invalid access Token");
  }
});
