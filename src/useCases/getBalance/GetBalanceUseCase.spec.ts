/**
 * @jest-environment ./src/database/mongo-environment-jest
*/

import mongoose from "mongoose"
import {AccountRepository} from "../../repositories/implementations/AccountRepository"
import {MovementRepository} from "../../repositories/implementations/MovementRepository"
import {CreateAccountUseCase} from "../createAccount/CreateAccountUseCase"
import {GetBalanceUseCase} from "./GetBalanceUseCase"
import {NotFound} from "http-errors"


describe("Get Balance of Account", () => {

    let getBalanceUseCase: GetBalanceUseCase
    let accountRepository : AccountRepository
    let movementRepository: MovementRepository
    let createAccountUseCase: CreateAccountUseCase

    beforeAll(async() => {
        await mongoose.connect(process.env.MONGODB_URI)
        accountRepository = new AccountRepository()
        movementRepository = new MovementRepository()
        getBalanceUseCase = new GetBalanceUseCase(movementRepository, accountRepository)
        createAccountUseCase = new CreateAccountUseCase(accountRepository)
    })

    it("Should get ballance of a account", async() => {
        const account = {
            cpf: "66655544422",
            name: "Test Account to get balance"
        }

        await createAccountUseCase.execute(account)

        const response = await getBalanceUseCase.execute({cpf: account.cpf})

        expect(response).toHaveProperty("cpf")
        expect(response).toHaveProperty("balance")
        expect(response.balance).toBe(0)
    })

    it("Should not get ballance of a nonexisting account", async() => {
        await expect(getBalanceUseCase.execute({cpf: "66655541422"}))
            .rejects.toEqual(new NotFound("Account not found."))
    })

    afterAll(async() => {
        await mongoose.disconnect()
    })
})