import { Router } from "express";
import { VerifyJWT } from "../middlewares/auth.middleware";
import { brainContent, shareBrain } from "../controllers/brain.controller";

export const brainRouter = Router();

brainRouter.post("/share", VerifyJWT, shareBrain);

brainRouter.get("/:shareLink", brainContent);
