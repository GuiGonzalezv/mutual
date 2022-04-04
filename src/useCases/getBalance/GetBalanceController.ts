import {Request, Response} from "express"
import {GetBalanceUseCase} from "./GetBalanceUseCase"

export class GetBalanceController {
    constructor(
        // eslint-disable-next-line no-unused-vars
        private getBalanceUseCase: GetBalanceUseCase
    ) {}

    async handler(request: Request, response: Response) {
        const {cpf} = request.body

        try {
            const balance = await this.getBalanceUseCase.execute({cpf})
            return response.status(200).send(balance)
        } catch  (err) {
            return response.status(err.status || 500).send(err.message || "Unexpected error")
        }
    }
}