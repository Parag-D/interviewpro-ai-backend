import { NextFunction, Response } from "express";
import { CustomRequest } from "../middleware/isLoggedIn";
import { myProfile } from "../services/myProfile";

export const myProfileController = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const profile = await myProfile(req);

    next(profile);
}

