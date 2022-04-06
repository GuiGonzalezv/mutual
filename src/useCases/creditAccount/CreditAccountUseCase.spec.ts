/**
 * @jest-environment ./src/database/mongo-environment-jest
*/

import {BadRequest} from "http-errors"
import mongoose from "mongoose"
import MovementType from "../../enums/MovementTypeEnum"
import {IAccountRepository} from "../../repositories/IAccountRepository"
import {IMovementRepository} from "../../repositories/IMovementRepository"
import {AccountRepository} from "../../repositories/implementations/AccountRepository"
import {MovementRepository} from "../../repositories/implementations/MovementRepository"
import {CreateAccountUseCase} from "../createAccount/CreateAccountUseCase"
import {CreditAccountUseCase} from "./CreditAccountUseCase"



describe("Credit account", () => {

    let accountRepository: IAccountRepository
    let movementRepository: IMovementRepository
    let creditAccountUseCase: CreditAccountUseCase
    let createAccountUseCase: CreateAccountUseCase

    beforeAll(async() => {
        await mongoose.connect(process.env.MONGODB_URI)
        accountRepository = new AccountRepository()
        movementRepository = new MovementRepository()
        creditAccountUseCase = new CreditAccountUseCase(movementRepository, accountRepository)
        createAccountUseCase = new CreateAccountUseCase(accountRepository)
    })

    it("Should be able to credit a account", async() => {
        const account = {
            cpf: "48727965824",
            name: "Test Account"
        }

        await createAccountUseCase.execute(account)

        const movement = {
            cpf: "48727965824",
            value: 1000
        }

        const response = await creditAccountUseCase.execute({cpf: movement.cpf, value: movement.value})

        expect(response).toHaveProperty("id")
        expect(response).toHaveProperty("accountId")
        expect(response.movementType).toBe(MovementType.credito)
        expect(response.value).toBe(1000)
    })

    it("Should not be able to credit a non-existent account", async() => {
        const movement = {
            cpf: "36585796585",
            value: 1000
        }

        await expect(creditAccountUseCase.execute({cpf: movement.cpf, value: movement.value}))
            .rejects.toEqual(new BadRequest("Account to be credited does not exist"))

    })

    afterAll(async() => {
        await mongoose.disconnect()
    })
})