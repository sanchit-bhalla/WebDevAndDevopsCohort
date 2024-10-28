const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { User } = require("../models/user.model");

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); //  save without validating bcz we don't need to validate here as we just update refreshToken
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const requiredBody = z.object({
    firstName: z.string().min(3).max(100),
    email: z.string().min(3).max(100).email(),
    password: z.string().min(8),
  });

  const { error } = requiredBody.safeParse(req.body);

  if (error) throw new ApiError(400, "Incorrect fields", error);

  await User.create(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, null, "Signed up successfully!"));
});

const signinUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const requiredBody = z.object({
    email: z.string().min(3).max(100).email(),
    password: z.string().min(8),
  });

  const { error } = requiredBody.safeParse(req.body);

  if (error) throw new ApiError(400, "Incorrect fields", error);

  const user = await User.findOne({ email });
  //   console.log({ user });

  if (!user) throw new ApiError(404, "User does not exists");

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) throw new ApiError(401, "Invalid user credentials!");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
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
    .json(new ApiResponse(200, { refreshToken }, "Signed In successfully!"));
});

module.exports = { registerUser, signinUser };
