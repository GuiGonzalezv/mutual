import {AccountRepository} from "../../repositories/implementations/AccountRepository"
import {MovementRepository} from "../../repositories/implementations/MovementRepository"
import {GetBalanceUseCase} from "../getBalance/GetBalanceUseCase"
import {DebitAccountController} from "./DebitAccountController"
import {DebitAccountUseCase} from "./DebitAccountUseCase"
import {ErrorHandler} from "../common/ErrorHandler"

const errorHandler = new ErrorHandler()


const movementRepository = new MovementRepository()
const accountRepository = new AccountRepository()
const getBalanceUseCase = new GetBalanceUseCase(movementRepository, accountRepository)
const debitAccountUseCase = new DebitAccountUseCase(movementRepository, accountRepository, getBalanceUseCase)
const debitAccountController = new DebitAccountController(debitAccountUseCase, errorHandler)

export {debitAccountController, debitAccountUseCase}