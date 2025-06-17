import { Router } from "express";
import { VerifyJWT } from "../../middlewares/auth.middleware";
import {
  addContent,
  getAllContents,
  removeContent,
} from "../../controllers/v2/content.controller";

export const contentRouterV2 = Router();

contentRouterV2.get("/", VerifyJWT, getAllContents);

contentRouterV2.post("/", VerifyJWT, addContent);

contentRouterV2.delete("/:contentId", VerifyJWT, removeContent);
