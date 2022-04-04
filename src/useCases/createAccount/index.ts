import {AccountRepository} from "../../repositories/implementations/AccountRepository"
import {CreateAccountController} from "./CreateAccountController"
import {CreateAccountUseCase} from "./CreateAccountUseCase"

const repository = new AccountRepository()
const createAccountUseCase = new CreateAccountUseCase(repository)
const createAccountController = new CreateAccountController(createAccountUseCase)

export {createAccountController, createAccountUseCase}