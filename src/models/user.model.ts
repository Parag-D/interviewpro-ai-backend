import mongoose from 'mongoose';
import { PASSWORD_MIN_LENGTH } from '../utils/constants';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 40,
    },
    email: {
      type: String,
      required: true,
      minLength: 2,
    },
    password: {
      type: String,
      minLength: PASSWORD_MIN_LENGTH,
    },
    resumeUrl: {
      type: String,
    },
    currentQuestions: {
      type: String,
    },
    previousQuestions: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

export interface IUser extends mongoose.Schema {
  name: string;
  email: string;
  password: string;
  deleted?: boolean;
  resumeUrl?: string;
  currentQuestions?: string
  previousQuestions?: string
}
export default mongoose.model<IUser>('User', userSchema);
