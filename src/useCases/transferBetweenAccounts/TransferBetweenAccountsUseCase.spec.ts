/**
 * @jest-environment ./src/database/mongo-environment-jest
*/

import mongoose from "mongoose"
import {AccountRepository} from "../../repositories/implementations/AccountRepository"
import {MovementRepository} from "../../repositories/implementations/MovementRepository"
import {CreateAccountUseCase} from "../createAccount/CreateAccountUseCase"
import {NotFound} from "http-errors"
import {CreditAccountUseCase} from "../creditAccount/CreditAccountUseCase"
import {TransferBetweenAccountsUseCase} from "./TransferBetweenAccountsUseCase"
import {DebitAccountUseCase} from "../debitAccount/DebitAccountUseCase"
import {GetBalanceUseCase} from "../getBalance/GetBalanceUseCase"


describe("Get Balance of Account", () => {

    let accountRepository : AccountRepository
    let movementRepository: MovementRepository
    let createAccountUseCase: CreateAccountUseCase
    let creditAccountUseCase: CreditAccountUseCase
    let debitAccountUseCase: DebitAccountUseCase
    let getBalanceUseCase: GetBalanceUseCase
    let transferBetweenAccountsUseCase : TransferBetweenAccountsUseCase

    beforeAll(async() => {
        await mongoose.connect(process.env.MONGODB_URI)
        accountRepository = new AccountRepository()
        movementRepository = new MovementRepository()
        creditAccountUseCase = new CreditAccountUseCase(movementRepository, accountRepository)
        getBalanceUseCase = new GetBalanceUseCase(movementRepository, accountRepository)
        debitAccountUseCase = new DebitAccountUseCase(movementRepository, accountRepository, getBalanceUseCase)
        createAccountUseCase = new CreateAccountUseCase(accountRepository)
        transferBetweenAccountsUseCase = new TransferBetweenAccountsUseCase(debitAccountUseCase, creditAccountUseCase, accountRepository)

    })

    it("Should transfer money between accounts", async() => {

        const fromAccount = {
            cpf: "30861575008",
            name: "Test Account to get balance"
        }

        const toAccount = {
            cpf: "43431611028",
            name: "Test Account to get balance"
        }

        await createAccountUseCase.execute(fromAccount)
        await createAccountUseCase.execute(toAccount)
        await creditAccountUseCase.execute({cpf: "30861575008", value: 2000})

        const transfer = {
            fromCpf: fromAccount.cpf,
            toCpf: toAccount.cpf,
            value: 1000
        }

        const response = await transferBetweenAccountsUseCase.execute(transfer)

        // expect(response).toHa
        // expect(response).toHaveProperty("balance")
        // expect(response.balance).toBe(0)
    })

    it("Should not get ballance of a nonexisting account", async() => {
        await expect(getBalanceUseCase.execute({cpf: "66655541422"}))
            .rejects.toEqual(new NotFound("Account not found."))
    })

    afterAll(async() => {
        await mongoose.disconnect()
    })
})