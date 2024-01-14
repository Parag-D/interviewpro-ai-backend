import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export async function signup(req: Request, res: Response, next: NextFunction) {
    const user = await authService.signup(req.body);

    next(user)
}

export async function signin(req: Request, res: Response, next: NextFunction) {
    const token = await authService.signin(req);
    next(token)
}