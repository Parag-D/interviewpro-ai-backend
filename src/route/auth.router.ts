import express from "express";
import { signin, signup } from "../controller/auth.controller";
import { getUserController } from "../controller/user.controller";
import { myProfileController } from "../controller/myProfile.controller";
import { isLoggedIn } from "../middleware/isLoggedIn";

export const authRouter = express.Router();

authRouter.get("/test", (_req, res) => {
    res.send("Server is Running :)");
});

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);

authRouter.get("/user/:userId", getUserController);
authRouter.get("/profile", isLoggedIn, myProfileController);
