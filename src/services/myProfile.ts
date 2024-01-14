import { CustomRequest } from "../middleware/isLoggedIn";

export const myProfile = async (req: CustomRequest) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const { userId, email, name } = req?.user!;

            const response = {
                _id: userId,
                name,
                email,
                token: {
                    access_token: token
                }
            }

            return response;
        }

    } catch (error) {
        throw new Error(`Error while getting myProfile: ${error}`);
    }

}