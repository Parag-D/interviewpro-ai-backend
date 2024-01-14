import { NextFunction, Request, Response } from "express";
import { textAndAudioGeneration } from "../services/questionsGenerate.service";
import { CustomRequest } from "../middleware/isLoggedIn";

export const uploadPdf = async (req: CustomRequest, res: Response, next: NextFunction) => {
try {
    console.log("inside upload pdf")
    console.log(req.file);
    const pdf = req.file?.buffer
    if(!pdf) {
        console.log(req.file)
        throw new Error("pdf not found")
    }

    const userId = req.user?.userId!;

    const pdfToText = await textAndAudioGeneration(pdf, userId);
    next(pdfToText)
} catch (error) {
    next(error)
}
}