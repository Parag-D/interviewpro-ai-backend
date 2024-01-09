import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtSecret } from "../services/jwt";
import { NextFunction, Request, Response } from "express";

export interface CustomRequest extends Request {
    user?: {
        userId: string;
        email: string;
    };
}

const verifyToken = async (token: string): Promise<JwtPayload|undefined> => {
    try {
        const isVerified = jwt.verify(token, jwtSecret) as JwtPayload;

        return isVerified;
    } catch (error) {
        console.log(error);
    }
}
export const isLoggedIn = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        console.log("hey")
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            console.log("hey after token")
            const tokenData = await verifyToken(token);
            console.log("after tokenData")
            if (!tokenData) {
                throw new Error('Invalid token');
            }
    
            const reqUserParams = {
                userId: tokenData['_id'],
                email: tokenData['email'],
            }
            req.user = reqUserParams;
            next();
        } else {
            throw new Error('No token provided');
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(401);
    }
}