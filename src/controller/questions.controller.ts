import { NextFunction, Request, Response } from "express";
import { QuestionService } from "../services/question.service";

const questionService = new QuestionService();
export const getQuestion = async (req: Request, res: Response, next: NextFunction) => {
    const questions = await questionService.getQuestions(req);
    next(questions)
}