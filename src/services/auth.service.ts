import { Request } from "express";
import userModel, { IUser } from "../models/user.model";
import { AuthRepository } from "../repository/auth.repository";
import bcrypt from "bcrypt";
import { ILoginToken, signAndReturnUserLoginToken } from "./jwt";
import mongoose from "mongoose";

const authRepository = new AuthRepository();

export class AuthService {
    async signup(body: any) {
        try {
            const { name, email, password } = body;
            let token;
    
            if (!name || !email || !password) {
                throw new Error('All fields are required');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await authRepository.signup({ name, email, password: hashedPassword });
    
            if (user) {
                token = await signAndReturnUserLoginToken({ userId: user._id, email: user.email, name: user.name });
            }
    
            const response = {
                _id: user._id,
                name: user.name,
                email: user.email,
                token
            }
    
            return response
        } catch (error) {
            return error
        }
    }

    async signin(req: Request) {
        try {
            const { email, password } = req.body;
            let token;
            if (!email || !password) {
                throw new Error('All fields are required');
            }

            const isUser = await userModel.findOne({ email });

            if (!isUser) {
                throw new Error('User does not exist');
            }

            const isPasswordValid = await bcrypt.compare(password, isUser.password);

            if (!isPasswordValid) {
                throw new Error('Incorrect password');
            }

            if (isPasswordValid) {
                token =  await signAndReturnUserLoginToken({ userId: isUser._id, email: isUser.email, name: isUser.name });
            }

            const response = {
                _id: isUser._id,
                name: isUser.name,
                email: isUser.email,
                token
            }

            return response
        } catch (error) {
            return error
        }

    }
}