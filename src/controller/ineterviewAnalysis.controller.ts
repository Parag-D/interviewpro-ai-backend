import { NextFunction, Response } from "express";
import { interviewAnalysis } from "../services/interviewAnalysis.service";
import { CustomRequest } from "../middleware/isLoggedIn";

export const interviewAnalysisController = async (req: CustomRequest, res: Response, next: NextFunction) => {
    if(!req.params.questionId) {
        throw new Error("Question Id is not provided.");
    }
    const questions = await interviewAnalysis(req.params.questionId);
    next(questions);
}