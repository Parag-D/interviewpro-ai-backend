import { Request } from "express";

export class QuestionService {
    
    async getQuestions(req: Request) {
        try {
            console.log("mere service me hu")
        const questions = req.body
        return questions;
        } catch (error) {
            console.log(error)
        }
    }

}