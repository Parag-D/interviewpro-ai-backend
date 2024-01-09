import questionsModel from "../models/questions.model";
import { S3_BUCKET_NAME } from "../utils/constants";
import { s3 } from "./s3";

export const getSignedURLForPut = async (params: { fileName: string, folder: string, questionId: string }): Promise<string> => {
    const s3Params = {
        Bucket: S3_BUCKET_NAME,
        Key: `${params.folder}/${params.fileName}`
    };
    return new Promise((resolve, reject) => {
        s3.getSignedUrl('putObject', s3Params, async (error, url) => {
            if (error) {
                reject(error);
            }

            //----move it to question repository----
            await updateQuestionWithUserAnswers(params.questionId, url);

            resolve(url);
        });
    });
};

//---move it to question repository---
export const updateQuestionWithUserAnswers = async (questionId: string, answerURL: string) => {
    const updated = await questionsModel.updateOne({ _id: questionId }, { mockVideoAnswer: answerURL });
    updated ? true : false
}