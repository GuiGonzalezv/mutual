import {AccountRepository} from "../../repositories/implementations/AccountRepository"
import {MovementRepository} from "../../repositories/implementations/MovementRepository"
import {CreditAccountController} from "./CreditAccountController"
import {CreditAccountUseCase} from "./CreditAccountUseCase"

const movementRepository = new MovementRepository()
const accountRepository = new AccountRepository()
const creditAccountUseCase = new CreditAccountUseCase(movementRepository, accountRepository)
const creditAccountController = new CreditAccountController(creditAccountUseCase)

export {creditAccountController, creditAccountUseCase}