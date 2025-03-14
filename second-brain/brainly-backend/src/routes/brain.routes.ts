import { Router } from "express";
import { VerifyJWT } from "../middlewares/auth.middleware";
import {
  brainContent,
  brainStatus,
  shareBrain,
  verifyHash,
} from "../controllers/brain.controller";

export const brainRouter = Router();

brainRouter.post("/share", VerifyJWT, shareBrain);

brainRouter.post("/verifyHash", VerifyJWT, verifyHash);

brainRouter.get("/status", VerifyJWT, brainStatus);

brainRouter.get("/:shareLink", brainContent);
