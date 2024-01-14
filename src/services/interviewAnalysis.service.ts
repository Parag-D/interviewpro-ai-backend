// frontend hit this after video uploadding then send questionId in params

import axios from "axios";
import questionsModel from "../models/questions.model"
const { exec } = require('child_process');

export const interviewAnalysis = async (questionId: String) => {
    try {
        //move this to repository
        const questions = await questionsModel.findById(questionId);
        const video_url = questions?.mockVideoAnswer;

        if (!video_url) {
            throw new Error("video answer is not found");
        }

        // ------hit dadus's api here to send answer_url in body
        const bufferVideo = await downloadVideoFromS3(video_url);
        const answer_audio = await separateAudio(bufferVideo, 'output.mp4');
        if (!answer_audio) {
            throw new Error("answer_audio not created");
        }
        // ------get the response feedback and send to the user

        return answer_audio;
    } catch (error) {
        return error;
    }
}

const separateAudio = (inputVideo: any, outputAudio: any) => {
    if(!inputVideo) {
        throw new Error ("inputVideo not provided");
    }
    console.log(inputVideo);
    return new Promise((resolve, reject) => {
        const command = `ffmpeg -i ${inputVideo} -q:a 0 -map a ${outputAudio}`;

        exec(command, (error: any, _stdout: any, stderr: any) => {
            if (error) {
                console.error(`Error executing ffmpeg: ${stderr}`);
                reject(error);
            } else {
                resolve(outputAudio);
            }
        });
    });
};

const downloadVideoFromS3 = async (s3VideoURL: string) => {
    try {
        console.log("inside downloadVideoFromS3", s3VideoURL);
      const response = await axios.get(s3VideoURL, { responseType: 'arraybuffer' });
      console.log(response.data);
      return Buffer.from(response.data, 'binary');
    } catch (error) {
      throw new Error(`Error downloading video from S3: ${error}`);
    }
  };