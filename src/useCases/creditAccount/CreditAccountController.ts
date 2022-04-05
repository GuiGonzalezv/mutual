import {Request, Response} from "express"
import {CreditAccountUseCase} from "./CreditAccountUseCase"
import {ErrorHandler} from "../common/ErrorHandler"


export class CreditAccountController {
    constructor(
        // eslint-disable-next-line no-unused-vars
        private creditAccountUseCase: CreditAccountUseCase,

        // eslint-disable-next-line no-unused-vars
        private errorHandler: ErrorHandler
    ) {}

    async handler(request: Request, response: Response) {
        const {cpf, value} = request.body

        try {
            await this.creditAccountUseCase.execute({cpf, value})
            return response.status(201).send("Credit realized with success")
        } catch (err) {
            await this.errorHandler.execute(response, err)
        }
    }
}