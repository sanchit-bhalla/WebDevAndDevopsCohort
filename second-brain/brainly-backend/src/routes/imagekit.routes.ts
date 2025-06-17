import { Router } from "express";
import { VerifyJWT } from "../middlewares/auth.middleware";
import {
  deleteFile,
  getAuthParameters,
} from "../controllers/imagekit.controller";

export const imagekitRouter = Router();

imagekitRouter.get("/auth", VerifyJWT, getAuthParameters);

imagekitRouter.delete("/", VerifyJWT, deleteFile);
