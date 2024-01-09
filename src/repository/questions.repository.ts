import questionsModel from "../models/questions.model"

export class questionRepository {
    private _model = questionsModel
    
    // hook
    async save(data: any) {
        return this._model.create(data)
    }
}