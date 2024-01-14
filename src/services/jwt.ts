import jwt from "jsonwebtoken";
import mongoose, { ObjectId } from "mongoose";
export interface ILoginToken {
    access_token: string,
    refresh_token?: string,
}
interface tokenSigningParams {
    userId: mongoose.Types.ObjectId,
    email?: string,
    name?: string,
    onlyAccessToken?: boolean,
}

export const jwtSecret = "itisatopsecret"
export const signAndReturnUserLoginToken = async (params: tokenSigningParams): Promise<ILoginToken> => {
    if (!params.userId) throw new Error('User Id not provided');

    const tokenData = { _id: params.userId, email: params.email, name: params.name };

    // const access_token = signJWT(tokenData, 200000);
    const access_token = jwt.sign(tokenData, jwtSecret, { expiresIn: 200000});

    const token: ILoginToken = { access_token };
    
    return token;
};