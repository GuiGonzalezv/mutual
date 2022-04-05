import {Request, Response} from "express"
import {CreateAccountUseCase} from "./CreateAccountUseCase"
import {ErrorHandler} from "../common/ErrorHandler"


export class CreateAccountController {
    constructor(
        // eslint-disable-next-line no-unused-vars
        private createAccountUseCase: CreateAccountUseCase,

        // eslint-disable-next-line no-unused-vars
        private errorHandler: ErrorHandler
    ) {}

    async handler(request: Request, response: Response) {
        const {cpf, name} = request.body

        try {

            await this.createAccountUseCase.execute({
                cpf,
                name
            })

            return response.status(201).send("Account created!")
        } catch (err) {
            await this.errorHandler.execute(response, err)
        }

    }
}