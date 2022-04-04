import {Request, Response} from "express"
import {CreateAccountUseCase} from "./CreateAccountUseCase"

export class CreateAccountController {
    constructor(
        // eslint-disable-next-line no-unused-vars
        private createAccountUseCase: CreateAccountUseCase
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
            return response.status(err.status || 500).send(err.message || "Unexpected error")
        }

    }
}