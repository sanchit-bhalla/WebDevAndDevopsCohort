import { Router } from "express";
import { VerifyJWT } from "../middlewares/auth.middleware";
import { chatResponse } from "../controllers/chat.controller";

export const chatRouter = Router();

chatRouter.get("/", VerifyJWT, chatResponse);
