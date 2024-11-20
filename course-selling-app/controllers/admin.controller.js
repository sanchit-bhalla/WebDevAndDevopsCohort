const jwt = require("jsonwebtoken");
const { asyncHandler } = require("../utils/asyncHandler");
const { Admin } = require("../models/admin.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { ADMIN_REFRESH_TOKEN_SECRET } = require("../config");

const generateAccessAndRefreshTokens = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);
    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false }); //  save without validating bcz we don't need to validate here as we just update refreshToken

    return { accessToken, refreshToken };
  } catch (err) {
    throw new ApiError(
      500,
      "Something went wrog while generating access token and refresh token"
    );
  }
};

const registerAdmin = asyncHandler(async (req, res) => {
  const requiredBody = z.object({
    firstName: z.string().min(3).max(100),
    email: z.string().min(3).max(100).email(),
    password: z.string().min(8),
  });

  const { error } = requiredBody.safeParse(req.body);

  if (error) throw new ApiError(400, "Incorrect fields", error);

  await Admin.create(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, null, "Signed up successfully!"));
});

const signinAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const requiredBody = z.object({
    email: z.string().min(3).max(100).email(),
    password: z.string().min(8),
  });

  const { error } = requiredBody.safeParse(req.body);

  if (error) throw new ApiError(400, "Incorrect fields", error);

  const admin = await Admin.findOne({ email });
  //   console.log({ admin });

  if (!admin) throw new ApiError(404, "Admin does not exists");

  const isPasswordValid = await admin.isPasswordCorrect(password);

  if (!isPasswordValid) throw new ApiError(401, "Invalid admin credentials!");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    admin._id
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

const logoutAdmin = asyncHandler(async (req, res) => {
  // clear cookies and reset the refreshToken
  await Admin.findByIdAndUpdate(
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
    .json(new ApiResponse(200, {}, "Admin logged out successfully!"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  // If someone is using mobile app then we need req.body.refreshToken
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) throw new ApiError(401, "unauthorized request");

  const decodedRefreshToken = jwt.verify(
    incomingRefreshToken,
    ADMIN_REFRESH_TOKEN_SECRET
  );
  // console.log({ decodedRefreshToken });

  const admin = await Admin.findById(decodedRefreshToken?._id);
  if (!admin) throw new ApiError(401, "Invalid Refresh token!");

  if (incomingRefreshToken !== admin?.refreshToken)
    throw new ApiError(401, "Refresh token is expired!");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    admin._id
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

  const admin = await Admin.findById(req.user?._id);
  if (!admin) throw new ApiError(401, "not authorized");

  const isPasswordCorrect = await admin.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect)
    throw new ApiError("400", "Old password didn't match");

  admin.password = newPassword;
  await admin.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully!"));
});

module.exports = {
  registerAdmin,
  signinAdmin,
  logoutAdmin,
  refreshAccessToken,
  changeCurrentPassword,
};
