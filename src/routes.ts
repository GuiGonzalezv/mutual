import {Router} from "express"
import {createAccountController} from "./useCases/createAccount"
import {creditAccountController} from "./useCases/creditAccount"
import {debitAccountController} from "./useCases/debitAccount"

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

export {router}
