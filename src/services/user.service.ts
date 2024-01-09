import userModel from "../models/user.model"

export const getUser = async (userId: string) => {
    try {
        if(!userId) {
            throw new Error("userId not provided");
        }
    
        return await getUserRepository(userId);
    } catch (error) {
        return error;
    }
}

//---move it to user repository---
export const getUserRepository = async (userId: string) => {
    return await userModel.findOne({ _id: userId });
}