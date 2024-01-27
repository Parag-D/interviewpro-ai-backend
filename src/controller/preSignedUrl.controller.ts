import { NextFunction, Response } from "express";
import { getSignedURLForPut } from "../services/preSignedUrl.service";
import { CustomRequest } from "../middleware/isLoggedIn";

export const videoSignedUrl = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const questionId = req.params.questionId;
    if(!questionId) {
        throw new Error("Question Id is not provided.");
    }
    const fileNameForVideo = questionId + '.webm';
    const fileNameForAudio = questionId + '.wav';
    const folder = 'mock-test-answers';

    const video_url = await getSignedURLForPut({fileName: fileNameForVideo, folder, questionId});
    const audio_url = await getSignedURLForPut({fileName: fileNameForAudio, folder, questionId});

    console.log({video_url, audio_url});
    next({video_url, audio_url});
}
