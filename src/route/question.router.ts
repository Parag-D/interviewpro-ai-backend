import express from "express";
import { getQuestion } from "../controller/questions.controller";

export const questionRouter = express.Router();

questionRouter.post("/get-questions/:questionId", getQuestion);