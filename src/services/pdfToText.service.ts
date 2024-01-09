import pdf from 'pdf-parse';
import { uploadBufferToS3 } from './s3';
import axios from 'axios';
import userModel from '../models/user.model';
import questionsModel from '../models/questions.model';
const mockModel = "https://4d58-14-97-167-154.ngrok-free.app/generate_question_and_audio";

export async function readPdfAndConvertToJson(pdfBuffer: Buffer, userId: string) {
    console.log("readPdfAndConvertToJson")
    try {
        // Parse PDF content
        const pdfData = await pdf(pdfBuffer);

        // upload to s3
        const uploaded = await uploadBufferToS3({
            buffer: pdfBuffer,
            fileName: `${userId}.pdf`,
        })

        // save resume-url to user db-collection
        const resumeUpdated = await userModel.updateOne({ _id: userId }, { resumeUrl: `resume/${userId}.pdf` });
        if(!resumeUpdated) {
            throw new Error("resume not updated");
        }

        const headers = {
            'Content-Type': 'application/json',
        };

        if (uploaded) {
            // Convert to JSON format
            const pdftextJson = {
                content: pdfData.text,
            };
            // get the audio and questions
            const pdfAudio = await axios.post(mockModel, pdftextJson, { headers });

            if (pdfAudio) {
                console.log({ pdfAudio })
                //----move it to question repository---
                const questionsSaved = await questionsModel.insertMany({
                    userId,
                    questions: pdfAudio.data
                });
                
                //----move it to user repository---
                const user = await userModel.findOne({ _id: userId });
                const questionId = questionsSaved[0]._id;
                await userModel.updateOne({ _id: userId }, { previousQuestions: user?.currentQuestions, currentQuestions: questionId });

                return questionsSaved ? { questionId, questions: pdfAudio.data } : false
            }
        }

    } catch (error) {
        throw new Error(`Error reading PDF and converting to JSON: ${error}`);
    }
}


