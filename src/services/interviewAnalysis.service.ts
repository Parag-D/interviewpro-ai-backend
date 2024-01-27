// frontend hit this after video uploadding then send questionId in params
import axios from "axios";
import questionsModel from "../models/questions.model"
import { QuestionRepository } from "../repository/questions.repository";
import { AWS_URL, MOCK_AI_SERVER_URL } from "../utils/constants";

const questionRepository = new QuestionRepository();

// const analysisURL = `http://ec2-65-2-124-86.ap-south-1.compute.amazonaws.com:5000/process_video`;
const analysisURL = `${MOCK_AI_SERVER_URL}/process_video`;

export const interviewAnalysis = async (questionId: String) => {
    try {
        //move this to repository
        const questions = await questionsModel.findById(questionId);
        const video_url = questions?.mockVideoAnswer;

        if (!video_url) {
            throw new Error("video answer is not found");
        }

        const payload = { "s3_video_url" : `${AWS_URL}/${video_url}`, "questionId": questionId, "questions": questions.questions };

        console.log({payload});
        const response = await axios.post(analysisURL, payload);

        console.log({feedback: response});
        if(!response.data) {
            throw new Error("Not able to send Video Url to the model");
        }
        return response.data;
    } catch (error) {
        return error;
    }
}

//SERVER CALL BY MOCK-AI MODEL
export const saveInterviewFeedback = async (questionId: String, feedback: String) => {
    try {
        if(questionId == null || feedback == null) {
            throw new Error("questionId or feedback not provided");
        }

        console.log(questionId, feedback)
        const updateFeedback = await questionRepository.updateData(questionId, feedback);

        if(!updateFeedback) {
            throw new Error("feedback not updated");
        }

        return true;
    } catch (error) {
        return error;
    }
}

// const separateAudio = (inputVideo: any, outputAudio: any) => {
//     if(!inputVideo) {
//         throw new Error ("inputVideo not provided");
//     }
//     console.log(inputVideo);
//     return new Promise((resolve, reject) => {
//         const command = `ffmpeg -i ${inputVideo} -q:a 0 -map a ${outputAudio}`;

//         exec(command, (error: any, _stdout: any, stderr: any) => {
//             if (error) {
//                 console.error(`Error executing ffmpeg: ${stderr}`);
//                 reject(error);
//             } else {
//                 resolve(outputAudio);
//             }
//         });
//     });
// };

// const downloadVideoFromS3 = async (s3VideoURL: string) => {
//     try {
//         console.log("inside downloadVideoFromS3", s3VideoURL);
//       const response = await axios.get(s3VideoURL, { responseType: 'arraybuffer' });
      
//       if(!response.data) {
//         throw new Error("video not found");
//       } 
//       console.log(response.data);
//       return Buffer.from(response.data, 'binary');
//     } catch (error) {
//       throw new Error(`Error downloading video from S3: ${error}`);
//     }
//   };