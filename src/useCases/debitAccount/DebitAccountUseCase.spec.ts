/**
 * @jest-environment ./src/database/mongo-environment-jest
*/

import {BadRequest, NotFound} from "http-errors"
import mongoose from "mongoose"
import MovementType from "../../enums/MovementTypeEnum"
import {IAccountRepository} from "../../repositories/IAccountRepository"
import {IMovementRepository} from "../../repositories/IMovementRepository"
import {AccountRepository} from "../../repositories/implementations/AccountRepository"
import {MovementRepository} from "../../repositories/implementations/MovementRepository"
import {CreateAccountUseCase} from "../createAccount/CreateAccountUseCase"
import {CreditAccountUseCase} from "../creditAccount/CreditAccountUseCase"
import {GetBalanceUseCase} from "../getBalance/GetBalanceUseCase"
import {DebitAccountUseCase} from "./DebitAccountUseCase"



describe("Debit Account", () => {

    let accountRepository: IAccountRepository
    let movementRepository: IMovementRepository
    let debitAccountUseCase: DebitAccountUseCase
    let createAccountUseCase: CreateAccountUseCase
    let getBalanceUseCase: GetBalanceUseCase
    let creditAccountUseCase: CreditAccountUseCase

    beforeAll(async() => {
        await mongoose.connect(process.env.MONGODB_URI)
        accountRepository = new AccountRepository()
        movementRepository = new MovementRepository()
        getBalanceUseCase = new GetBalanceUseCase(movementRepository, accountRepository)
        debitAccountUseCase = new DebitAccountUseCase(movementRepository, accountRepository, getBalanceUseCase)
        createAccountUseCase = new CreateAccountUseCase(accountRepository)
        creditAccountUseCase = new CreditAccountUseCase(movementRepository, accountRepository)
    })

    it("Should be able to debit a account", async() => {
        const account = {
            cpf: "10022233344",
            name: "Test Account"
        }

        await createAccountUseCase.execute(account)

        const movement = {
            cpf: "10022233344",
            value: 1000
        }

        await creditAccountUseCase.execute(movement)

        const response = await debitAccountUseCase.execute(movement)

        expect(response).toHaveProperty("id")
        expect(response).toHaveProperty("accountId")
        expect(response.movementType).toBe(MovementType.debito)
        expect(response.value).toBe(movement.value)
    })

    it("Should not be able to debit account", async() => {
        const movement = {
            cpf: "99903345688",
            value: 1000
        }

        await expect(debitAccountUseCase.execute(movement))
            .rejects.toEqual(new NotFound("Account to be debited does not exist"))

    })

    it("Should not be able to have bad credit", async() => {
        const account = {
            cpf: "38202027755",
            name: "Test Account"
        }

        await createAccountUseCase.execute(account)

        const movement = {
            cpf: "38202027755",
            value: 1000
        }

        await expect(debitAccountUseCase.execute(movement))
            .rejects.toEqual(new BadRequest("Insufficient balance to carry out this operation"))
    })

    afterAll(async() => {
        await mongoose.disconnect()
    })
})