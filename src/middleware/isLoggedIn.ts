import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtSecret } from "../services/jwt";
import { NextFunction, Request, Response } from "express";

export interface CustomRequest extends Request {
    user?: {
        userId: string;
        name: string;
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
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const tokenData = await verifyToken(token);
            if (!tokenData) {
                throw new Error('Invalid token');
            }
    
            const reqUserParams = {
                userId: tokenData['_id'],
                name: tokenData['name'],
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