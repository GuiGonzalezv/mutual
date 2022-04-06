import {AccountRepository} from "../../repositories/implementations/AccountRepository"
import {MovementRepository} from "../../repositories/implementations/MovementRepository"
import {ErrorHandler} from "../common/ErrorHandler"
import {GetBalanceController} from "./GetBalanceController"
import {GetBalanceUseCase} from "./GetBalanceUseCase"

const errorHandler = new ErrorHandler()

const accountRepository = new AccountRepository()
const movementRepository = new MovementRepository()

const getBalanceUseCase = new GetBalanceUseCase(movementRepository, accountRepository)
const getBalanceController = new GetBalanceController(getBalanceUseCase, errorHandler)

export {getBalanceController}