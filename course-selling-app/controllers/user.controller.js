const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { User } = require("../models/user.model");
const { Purchase } = require("../models/purchase.model");
const { Course } = require("../models/course.model");
const { USER_REFRESH_TOKEN_SECRET } = require("../config");

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

const logoutUser = asyncHandler(async (req, res) => {
  // clear cookies and reset the refreshToken
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

const refreshAccessToken = asyncHandler(async (req, res) => {
  // If someone is using mobile app then we need req.body.refreshToken
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) throw new ApiError(401, "unauthorized request");

  const decodedRefreshToken = jwt.verify(
    incomingRefreshToken,
    USER_REFRESH_TOKEN_SECRET
  );
  // console.log({ decodedRefreshToken });

  const user = await User.findById(decodedRefreshToken?._id);
  if (!user) throw new ApiError(401, "Invalid Refresh token!");

  if (incomingRefreshToken !== user?.refreshToken)
    throw new ApiError(401, "Refresh token is expired!");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
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
        {
          refreshToken,
        },
        "Access Token Refreshed successfully!"
      )
    );
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  if (newPassword !== confirmNewPassword)
    throw new ApiError(400, "New password and confirm password didn't match!");

  const passwordBody = z.object({
    newPassword: z.string().min(8),
    confirmNewPassword: z.string().min(8),
  });

  const { error } = passwordBody.safeParse(req.body);

  if (error) throw new ApiError(400, "Incorrect fields", error);

  const user = await User.findById(req.user?._id);
  if (!user) throw new ApiError(401, "not authorized");

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect)
    throw new ApiError("400", "Old password didn't match");

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully!"));
});

const purchasedCourses = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const purchases = await Purchase.find({ user: userId });

  let purchasedCourseIds = purchases.map((purchase) => purchase.course);

  const courses = await Course.find({
    _id: { $in: purchasedCourseIds },
  }).select("title description price");

  return res.status(200).json(new ApiResponse(200, { courses }));
});

module.exports = {
  registerUser,
  signinUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  purchasedCourses,
};
