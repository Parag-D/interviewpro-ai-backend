import express from "express";
import { uploadPdf } from "../controller/pdfFileMulter";
import uploadMulter from "../services/uploadMulter.service";
import { isLoggedIn } from "../middleware/isLoggedIn";
import { videoSignedUrl } from "../controller/preSignedUrl.controller";

export const uploadRouter = express.Router();

uploadRouter.post("/resume", isLoggedIn, uploadMulter.single("resume"), uploadPdf);
uploadRouter.post("/video/:questionId", isLoggedIn, videoSignedUrl);