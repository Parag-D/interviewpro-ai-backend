import { NextFunction, Request, Response } from "express";
import { readPdfAndConvertToJson } from "../services/pdfToText.service";
import { CustomRequest } from "../middleware/isLoggedIn";

export const uploadPdf = async (req: CustomRequest, res: Response, next: NextFunction) => {
try {
    console.log("inside upload pdf")
    const pdf = req.file?.buffer
    if(!pdf) {
        console.log(req.file)
        throw new Error("pdf not found")
    }

    const userId = req.user?.userId!;

    const pdfToText = await readPdfAndConvertToJson(pdf, userId);
    next(pdfToText)
} catch (error) {
    next(error)
}
}