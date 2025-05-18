import { Router } from "express";
import { VerifyJWT } from "../middlewares/auth.middleware";
import {
  addContent,
  getAllContents,
  handleOptionalFileUploadLocally,
  removeContent,
} from "../controllers/content.controller";
import { upload } from "../middlewares/multer.middleware";

export const contentRouter = Router();

contentRouter.get("/", VerifyJWT, getAllContents);

// contentRouter.post("/", VerifyJWT, handleOptionalFileUploadLocally, addContent);
contentRouter.post("/", VerifyJWT, upload.single("uploaded_file"), addContent);

contentRouter.delete("/:contentId", VerifyJWT, removeContent);
