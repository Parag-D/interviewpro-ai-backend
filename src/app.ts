import express, { NextFunction } from 'express';
import "dotenv/config";
import { authRouter } from './route/auth.router';
// import { pdfRouter } from './route/pdfToText.router';
import { questionRouter } from './route/question.router';
import { uploadRouter } from './route/upload.router';
const cors = require("cors");

export const app = express();

//middleware
app.use(cors())
app.use(express.json());

app.use("/auth", authRouter);
app.use("/question", questionRouter);
// app.use("/pdf", pdfRouter);
app.use("/upload", uploadRouter);


app.use((data:any, req:any, res:any, next:any) => {
    if(data instanceof Error) {
        return res.status(500).json({success: false, error: data.message, data: {}})
    }
    
    res.status(200).json({success: true, data: data})
})