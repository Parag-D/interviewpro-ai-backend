import { app } from "./app";
import mongoose from "mongoose";
import { env } from "./utils/validateEnv";

mongoose.connect(env.MONGO_URL)
    .then(() => {
        console.log("Mongodb connected");
        app.listen(env.PORT, () => console.log("Server is listening on " + env.PORT));
    })
    .catch(console.error);