import {Request, Response} from "express"
import {CreditAccountUseCase} from "./CreditAccountUseCase"

export class CreditAccountController {
    constructor(
        // eslint-disable-next-line no-unused-vars
        private creditAccountUseCase: CreditAccountUseCase
    ) {}

    async handler(request: Request, response: Response) {
        const {cpf, value} = request.body

        try {
            await this.creditAccountUseCase.execute({cpf, value})
            return response.status(201).send("Credit realized with success")
        } catch (err) {
            return response.status(err.status || 500).send(err.message || "Unexpected error")
        }
    }
}