import express from "express";
import { signin, signup } from "../controller/auth.controller";
import { getUserController } from "../controller/user.controller";

export const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);

authRouter.get("/user/:userId", getUserController);