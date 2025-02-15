import { Router } from "express";
import {
  logoutUser,
  refreshAccessToken,
  registerUser,
  signinUser,
} from "../controllers/user.controller";
import { VerifyJWT } from "../middlewares/auth.middleware";

export const userRouter = Router();

userRouter.post("/signup", registerUser);

userRouter.post("/signin", signinUser);

userRouter.post("/logout", VerifyJWT, logoutUser);

userRouter.post("/refresh-token", refreshAccessToken);
