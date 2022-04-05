import {Router} from "express"
import {createAccountController} from "./useCases/createAccount"
import {creditAccountController} from "./useCases/creditAccount"
import {debitAccountController} from "./useCases/debitAccount"
import {getBalanceController} from "./useCases/getBalance"
import {transferBetweenAccountsController} from "./useCases/transferBetweenAccounts"


const router = Router()

router.post("/account", (request, response) => {
    return createAccountController.handler(request, response)
})

router.post("/debit", (request, response) => {
    return debitAccountController.handler(request, response)
})

router.post("/credit", (request, response) => {
    return creditAccountController.handler(request, response)
})

router.post("/transfer", (request, response) => {
    return transferBetweenAccountsController.handler(request, response)
})

router.get("/balance/:cpf", (request, response) => {
    return getBalanceController.handler(request, response)
})


export {router}
