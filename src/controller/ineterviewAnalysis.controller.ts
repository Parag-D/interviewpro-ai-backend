import { NextFunction, Response } from "express";
import { interviewAnalysis, saveInterviewFeedback } from "../services/interviewAnalysis.service";
import { CustomRequest } from "../middleware/isLoggedIn";

export const interviewAnalysisController = async (req: CustomRequest, res: Response, next: NextFunction) => {
    if(!req.params.questionId) {
        throw new Error("Question Id is not provided.");
    }
    const feedback = await interviewAnalysis(req.params.questionId);

    const savedToDB = await saveInterviewFeedback(req.params.questionId, feedback)

    if(!savedToDB) {
        throw new Error("feedback not saved");
    }

    next(feedback);
}

export const saveInterviewFeedbackController = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const saveFeedback = await saveInterviewFeedback(req.params.questionId, req.body.feedback);
    next(saveFeedback);
}