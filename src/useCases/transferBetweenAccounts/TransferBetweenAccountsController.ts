import {Request, Response} from "express"
import {ErrorHandler} from "../common/ErrorHandler"
import {TransferBetweenAccountsUseCase} from "./TransferBetweenAccountsUseCase"

export class TransferBetweenAccountsController {
    constructor(
        // eslint-disable-next-line no-unused-vars
        private transferBetweenAccountUseCase: TransferBetweenAccountsUseCase,
        // eslint-disable-next-line no-unused-vars
        private errorHandler: ErrorHandler
    ) {}

    async handler(request: Request, response: Response) {
        const {fromCpf, toCpf, value} = request.body

        try {
            await this.transferBetweenAccountUseCase.execute({fromCpf, toCpf, value})
            return response.status(201).send("Transfer carried out successfully")
        } catch (err) {
            await this.errorHandler.execute(response, err)
        }
    }
}