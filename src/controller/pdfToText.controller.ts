// import { NextFunction, Request, Response } from "express";
// import { readPdfAndConvertToJson } from "../services/pdfToText.service";
// import axios from "axios";

// const mockModel = "https://b807-14-97-167-154.ngrok-free.app/generate_question_and_audio";

// export async function pdfToText(req: Request, res: Response, next: NextFunction) {
//     try {
//         console.log("inside")
//         // const pdf = await readPdfAndConvertToJson("../controller/pdf-src/Parag_Darade.pdf");
//         const headers = {
//             'Content-Type': 'application/json',
//             // Add any additional headers as needed
//           }
//         const pdfAudio = await axios.post(mockModel, pdf)
//         console.log(pdfAudio)
//         if(pdf) {
//             next(pdf);
//         }
//     } catch (error) {
//         console.log(error)
//         next(error);
//     }

// }