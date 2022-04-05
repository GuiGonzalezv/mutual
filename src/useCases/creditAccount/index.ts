import {AccountRepository} from "../../repositories/implementations/AccountRepository"
import {MovementRepository} from "../../repositories/implementations/MovementRepository"
import {CreditAccountController} from "./CreditAccountController"
import {CreditAccountUseCase} from "./CreditAccountUseCase"
import {ErrorHandler} from "../common/ErrorHandler"

const errorHandler = new ErrorHandler()
const movementRepository = new MovementRepository()
const accountRepository = new AccountRepository()
const creditAccountUseCase = new CreditAccountUseCase(movementRepository, accountRepository)
const creditAccountController = new CreditAccountController(creditAccountUseCase, errorHandler)

export {creditAccountController, creditAccountUseCase}