import { z } from "zod";
import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.model";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import { REFRESH_TOKEN_SECRET } from "../config";
import { DecodedTokenJwt } from "../types/DecodedTokenJwt";

const generateAccessAndRefreshToken = async (userId: any) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user?.generateAccessToken();
    const refreshToken = user?.generateRefreshToken();
    return { accessToken, refreshToken };
  } catch (err) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

export const registerUser = asyncHandler(async (req, res) => {
  const userSchema = z.object({
    username: z.string().min(1, "username is required"),
    email: z.string().min(3).email(),
    password: z.string().min(8, "Password must be atleast 8 characters long"),
  });

  type UserSchema = z.infer<typeof userSchema>;

  const { error, data } = userSchema.safeParse(req.body);
  if (error) throw new ApiError(400, "Incorrect fields", error);

  await User.create(data);

  return res
    .status(201)
    .json(new ApiResponse(201, null, "Signed up successfully!"));
});

export const signinUser = asyncHandler(async (req: Request, res: Response) => {
  const userSchema = z.object({
    email: z.string().min(3).email(),
    password: z.string().min(8, "Password must be atleast 8 characters long"),
  });

  const { error, data } = userSchema.safeParse(req.body);
  if (error) throw new ApiError(400, "Incorrect fields", error);

  const user = await User.findOne({ email: data.email });
  if (!user) throw new ApiError(404, "User does not exists");

  const isPasswordValid = await user.isPasswordCorrect(data.password);

  if (!isPasswordValid) throw new ApiError(401, "Invalid user credentials!");

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  // By default cookies can be modified from frontend. But if we pass below options, then cookies can be modified from server only
  const options = {
    httpOnly: true, // Flags the cookie to be accessible only by the web server
    secure: true, // cookie to be used with HTTPS only.
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, { refreshToken, user }, "Signed In successfully")
    );
});

export const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response) => {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) throw new ApiError(401, "unauthorized request");

    const decodedRefreshToken = jwt.verify(
      incomingRefreshToken,
      REFRESH_TOKEN_SECRET as string
    ) as DecodedTokenJwt;

    const user = await User.findById(decodedRefreshToken?._id);
    if (!user) throw new ApiError(401, "Invalid Refresh Token");

    if (incomingRefreshToken !== user?.refreshToken)
      throw new ApiError(401, "Refresh Token is expired!");

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const options = {
      httpOnly: true, // Flags the cookie to be accessible only by the web server
      secure: true, // cookie to be used with HTTPS only.
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { refreshToken },
          "Access Token Refreshed successfully!"
        )
      );
  }
);

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      // $set: { refreshToken: "" }, // or unset the field
      $unset: {
        refreshToken: 1, // This removes the field from the document
      },
    },
    {
      new: true, // return the modified document rather than the original
    }
  );

  // Web browsers and other compliant clients will only clear the cookie if the given options is identical to those given to res.cookie(), excluding expires and maxAge.
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully!"));
});
