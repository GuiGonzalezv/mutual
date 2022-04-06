/**
 * @jest-environment ./src/database/mongo-environment-jest
*/

import {BadRequest} from "http-errors"
import mongoose from "mongoose"
import {IAccountRepository} from "../../repositories/IAccountRepository"
import {AccountRepository} from "../../repositories/implementations/AccountRepository"
import {CreateAccountUseCase} from "./CreateAccountUseCase"


describe("Create account", () => {

    let accountRepository: IAccountRepository
    let createAccountUseCase: CreateAccountUseCase

    beforeAll(async() => {
        await mongoose.connect(process.env.MONGODB_URI)
        accountRepository = new AccountRepository()
        createAccountUseCase = new CreateAccountUseCase(accountRepository)
    })

    it("Should be able create a account", async() => {


        const account = {
            cpf: "48727965854",
            name: "Test Account"
        }

        const response = await createAccountUseCase.execute(account)

        expect(response).toHaveProperty("id")
        expect(response.cpf).toBe("48727965854")
        expect(response.name).toBe("Test Account")

    })

    it("Should not be able to create a account", async() => {
        const account = {
            cpf: "25485698532",
            name: "Test Existing Account"
        }

        await createAccountUseCase.execute(account)

        await expect(createAccountUseCase.execute(account)).rejects.toEqual(new BadRequest("Account already exist."))

    })

    afterAll(async() => {
        await mongoose.disconnect()
    })
})