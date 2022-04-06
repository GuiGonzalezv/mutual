import {AccountRepository} from "../../repositories/implementations/AccountRepository"
import {MovementRepository} from "../../repositories/implementations/MovementRepository"
import {ErrorHandler} from "../common/ErrorHandler"
import {CreditAccountUseCase} from "../creditAccount/CreditAccountUseCase"
import {DebitAccountUseCase} from "../debitAccount/DebitAccountUseCase"
import {GetBalanceUseCase} from "../getBalance/GetBalanceUseCase"
import {TransferBetweenAccountsController} from "./TransferBetweenAccountsController"
import {TransferBetweenAccountsUseCase} from "./TransferBetweenAccountsUseCase"

const errorHandler = new ErrorHandler()
const accountRepository = new AccountRepository()
const movementRepository = new MovementRepository()

const getBalanceUseCase = new GetBalanceUseCase(movementRepository, accountRepository)

const debitAccountUseCase = new DebitAccountUseCase(movementRepository, accountRepository, getBalanceUseCase)
const creditAccountUseCase = new CreditAccountUseCase(movementRepository, accountRepository)

const transferBetweenAccountsUseCase = new TransferBetweenAccountsUseCase(debitAccountUseCase, creditAccountUseCase, accountRepository)
const transferBetweenAccountsController = new TransferBetweenAccountsController(transferBetweenAccountsUseCase, errorHandler)

export {transferBetweenAccountsController}