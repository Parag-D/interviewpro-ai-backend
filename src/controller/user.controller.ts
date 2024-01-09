import { NextFunction, Request, Response } from "express";
import { getUser } from "../services/user.service";

export const getUserController = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const user = await getUser(userId);
    next(user)
}