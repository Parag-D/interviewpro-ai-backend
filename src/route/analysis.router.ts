import express from "express";
import { interviewAnalysisController, saveInterviewFeedbackController } from "../controller/ineterviewAnalysis.controller";
import { isLoggedIn } from "../middleware/isLoggedIn";

export const analysisRouter = express.Router();

analysisRouter.post("/:questionId", isLoggedIn, interviewAnalysisController);
// analysisRouter.post("/:questionId", saveInterviewFeedbackController);