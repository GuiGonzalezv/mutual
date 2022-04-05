import {Request, Response} from "express"
import {GetBalanceUseCase} from "./GetBalanceUseCase"
import {ErrorHandler} from "../common/ErrorHandler"


export class GetBalanceController {
    constructor(
        // eslint-disable-next-line no-unused-vars
        private getBalanceUseCase: GetBalanceUseCase,

        // eslint-disable-next-line no-unused-vars
        private errorHandler: ErrorHandler

    ) {}

    async handler(request: Request, response: Response) {
        const {cpf} = request.params

        try {
            const balance = await this.getBalanceUseCase.execute({cpf: cpf})
            return response.status(200).send(balance)
        } catch  (err) {
            await this.errorHandler.execute(response, err)
        }
    }
}