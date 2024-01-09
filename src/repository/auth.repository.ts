import userModel from "../models/user.model"

import { IUser } from "../models/user.model"
export class AuthRepository {
    private _model = userModel
    async signup(params: any) {
        return this._model.create(params)
    }

    async getUser(params: any) {
        return this._model.findOne(params)
    }
}