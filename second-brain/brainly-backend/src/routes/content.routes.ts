import { Router } from "express";
import { VerifyJWT } from "../middlewares/auth.middleware";
import {
  addContent,
  getAllContents,
  removeContent,
} from "../controllers/content.controller";

export const contentRouter = Router();

contentRouter.get("/", VerifyJWT, getAllContents);

contentRouter.post("/", VerifyJWT, addContent);

contentRouter.delete("/:contentId", VerifyJWT, removeContent);
