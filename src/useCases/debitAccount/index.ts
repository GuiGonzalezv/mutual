import {AccountRepository} from "../../repositories/implementations/AccountRepository"
import {MovementRepository} from "../../repositories/implementations/MovementRepository"
import {DebitAccountController} from "./DebitAccountController"
import {DebitAccountUseCase} from "./DebitAccountUseCase"

const movementRepository = new MovementRepository()
const accountRepository = new AccountRepository()
const debitAccountUseCase = new DebitAccountUseCase(movementRepository, accountRepository)
const debitAccountController = new DebitAccountController(debitAccountUseCase)

export {debitAccountController, debitAccountUseCase}