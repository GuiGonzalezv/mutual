import {Request, Response} from "express"
import {DebitAccountUseCase} from "./DebitAccountUseCase"
import {ErrorHandler} from "../common/ErrorHandler"


export class DebitAccountController {
    constructor(
        // eslint-disable-next-line no-unused-vars
        private debitAccountUseCase: DebitAccountUseCase,
        // eslint-disable-next-line no-unused-vars
        private errorHandler: ErrorHandler
    ) {}

    async handler(request: Request, response: Response) {
        const {cpf, value} = request.body

        try {
            await this.debitAccountUseCase.execute({cpf, value})
            return response.status(201).send("Debit realized with success")
        } catch (err) {
            await this.errorHandler.execute(response, err)
        }
    }
}