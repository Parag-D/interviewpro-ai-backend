import { NextFunction, Request, Response } from "express";
import { getSignedURLForPut } from "../services/preSignedUrl.service";
import { CustomRequest } from "../middleware/isLoggedIn";

export const videoSignedUrl = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const questionId = req.params.questionId;
    const fileName = questionId + '.mp4';
    const folder = 'mock-test-answers';
    const url = await getSignedURLForPut({fileName, folder, questionId});

    next({url});
}