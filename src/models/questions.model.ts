import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
            trim: true,
        },
        questions: {
            type: [{
                title: {
                    type: String,
                },
                audio_url: {
                    type: String,
                }
            }],
        },
        mockVideoAnswer: {
            type: String,
            default: false
        }   
    },
    { timestamps: true }
);

export interface IQuestions extends mongoose.Schema {
    _id: mongoose.Types.ObjectId,
    userId: string,
    questions: Array<{ title: string, audio_url: string }>,
    mockVideoAnswer: string
}
export default mongoose.model<IQuestions>('Question', questionSchema);
