import {AccountRepository} from "../../repositories/implementations/AccountRepository"
import {CreateAccountController} from "./CreateAccountController"
import {CreateAccountUseCase} from "./CreateAccountUseCase"
import {ErrorHandler} from "../common/ErrorHandler"

const errorHandler = new ErrorHandler()

const repository = new AccountRepository()
const createAccountUseCase = new CreateAccountUseCase(repository)
const createAccountController = new CreateAccountController(createAccountUseCase, errorHandler)

export {createAccountController, createAccountUseCase}