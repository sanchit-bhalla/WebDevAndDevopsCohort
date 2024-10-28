// const express = require("express")
// const router = express.Router()
const { Router } = require("express");
const { registerUser, signinUser } = require("../controllers/user.controller");

const userRouter = Router();

userRouter.post("/signup", registerUser);

userRouter.post("/signin", signinUser);

userRouter.post("/logout", (req, res, next) => {});

userRouter.post("/refresh-token", (req, res, next) => {});

userRouter.post("/reset-password", (req, res, next) => {});

userRouter.post("/purchases", (req, res, next) => {});

module.exports = { userRouter };
