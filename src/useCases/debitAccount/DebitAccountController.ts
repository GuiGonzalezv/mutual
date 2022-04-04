import {Request, Response} from "express"
import {DebitAccountUseCase} from "./DebitAccountUseCase"

export class DebitAccountController {
    constructor(
        // eslint-disable-next-line no-unused-vars
        private debitAccountUseCase: DebitAccountUseCase
    ) {}

    async handler(request: Request, response: Response) {
        const {cpf, value} = request.body

        try {
            await this.debitAccountUseCase.execute({cpf, value})
            return response.status(201).send("Debit realized with success")
        } catch (err) {
            return response.status(err.status || 500).send(err.message || "Unexpected error")
        }
    }
}