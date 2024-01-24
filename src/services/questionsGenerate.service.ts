import pdf from 'pdf-parse';
import { uploadBufferToS3 } from './s3';
import axios from 'axios';
import userModel from '../models/user.model';
import questionsModel from '../models/questions.model';
import { MOCK_AI_SERVER_URL } from '../utils/constants';
// const mockModel = "http://ec2-65-2-124-86.ap-south-1.compute.amazonaws.com:5001/generate_question_and_audio";
const mockModel = `${MOCK_AI_SERVER_URL}/generate_question_and_audio`;


export async function textAndAudioGeneration(pdfBuffer: Buffer, userId: string) {
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

            if(!pdfAudio.data) {
                throw new Error("Didn't get pdfAudio from mockModel");
            }
            if (pdfAudio.data) {
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


