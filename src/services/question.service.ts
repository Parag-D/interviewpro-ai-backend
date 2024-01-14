import { Request } from "express";
import questionsModel from "../models/questions.model";

export class QuestionService {

    async getQuestions(req: Request) {
        try {
            const { questionId } = req.params;
            const questions = await questionsModel.findById(questionId);
            return questions;
        } catch (error) {
            console.log(error)
        }
    }

}