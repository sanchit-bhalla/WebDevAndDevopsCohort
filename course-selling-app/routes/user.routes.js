// const express = require("express")
// const router = express.Router()
const { Router } = require("express");
const {
  registerUser,
  signinUser,
  logoutUser,
} = require("../controllers/user.controller");
const { verifyUserJWT } = require("../middlewares/authUser.middleware");

const userRouter = Router();

userRouter.post("/signup", registerUser);

userRouter.post("/signin", signinUser);

userRouter.post("/logout", verifyUserJWT, logoutUser);

userRouter.post("/refresh-token", (req, res, next) => {});

userRouter.post("/reset-password", (req, res, next) => {});

userRouter.post("/purchases", (req, res, next) => {});

module.exports = { userRouter };
