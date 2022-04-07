/**
 * @jest-environment ./src/database/mongo-environment-jest
*/

import app from "../../app"
import request from "supertest"

describe("Debit Account Controller", () => {
    it("Should be able to debit a account", async() => {
        await request(app).post("/account").send({
            cpf: "03344455566",
            name: "Test Integration debit Account"
        })

        await request(app).post("/account/credit").send({
            cpf: "03344455566",
            value: 1000
        })

        const response = await request(app).post("/account/debit").send({
            cpf: "03344455566",
            value: 500
        })

        expect(response.status).toBe(201)
        expect(response.text).toBe("Debit realized with success")
    })

    it("Should not found account to debit", async() => {
        //Debit a nonexisting account
        const response = await request(app)
            .post("/account/debit")
            .send({
                cpf: "03344455577",
                name: "Test Integration Account not found on debit"
            })

        expect(response.status).toBe(400)
        expect(response.text).toBe("Account to be debited does not exist")
    })

    it("Should not be able to have bad credit", async() => {
        //Create Account
        await request(app).post("/account").send({
            cpf: "01122233344",
            name: "Test Integration debit Account"
        })

        const response = await request(app).post("/account/debit").send({
            cpf: "01122233344",
            value: 1000
        })

        expect(response.status).toBe(400)
        expect(response.text).toBe("Insufficient balance to carry out this operation")
    })


})

