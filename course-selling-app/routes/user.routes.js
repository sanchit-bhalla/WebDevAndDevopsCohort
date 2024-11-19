// const express = require("express")
// const router = express.Router()
const { Router } = require("express");
const {
  registerUser,
  signinUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
} = require("../controllers/user.controller");
const { verifyUserJWT } = require("../middlewares/authUser.middleware");

const userRouter = Router();

userRouter.post("/signup", registerUser);

userRouter.post("/signin", signinUser);

userRouter.post("/logout", verifyUserJWT, logoutUser);

userRouter.post("/refresh-token", refreshAccessToken);

userRouter.post("/reset-password", verifyUserJWT, changeCurrentPassword);

userRouter.post("/purchases", (req, res, next) => {});

module.exports = { userRouter };
