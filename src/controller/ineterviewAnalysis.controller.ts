import { NextFunction, Response } from "express";
import { interviewAnalysis, saveInterviewFeedback } from "../services/interviewAnalysis.service";
import { CustomRequest } from "../middleware/isLoggedIn";

export const interviewAnalysisController = async (req: CustomRequest, res: Response, next: NextFunction) => {
    console.log("Inside interview analysis...");
    if(!req.params.questionId) {
        throw new Error("Question Id is not provided.");
    }
    const feedback = await interviewAnalysis(req.params.questionId);

    const savedToDB = await saveInterviewFeedback(req.params.questionId, feedback)

    if(!savedToDB) {
        throw new Error("feedback not saved");
    }

    console.log("Successfully saved feedback");
    next(feedback);
}

export const saveInterviewFeedbackController = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const saveFeedback = await saveInterviewFeedback(req.params.questionId, req.body.feedback);
    next(saveFeedback);
}