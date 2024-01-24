import questionsModel from "../models/questions.model"

export class QuestionRepository {
    private _model = questionsModel
    
    // hook
    async save(data: any) {
        return this._model.create(data)
    }

    async updateData(questionId: String, data: any) {
        console.log(questionId, data);
        return this._model.findByIdAndUpdate(questionId, {feedback: data.feedback});
    }
}