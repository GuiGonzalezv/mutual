/**
 * @jest-environment ./src/database/mongo-environment-jest
*/

import app from "../../app"
import request from "supertest"

describe("Transfer Between Accounts", () => {
    it("Should be able to transfer between accounts", async() => {
        await request(app).post("/account").send({
            cpf: "56055187043",
            name: "Test Integration transfer between accounts (from Account)"
        })

        await request(app).post("/account").send({
            cpf: "41715547055",
            name: "Test Integration transfer between accounts (to Account)"
        })


        await request(app).post("/account/credit").send({
            cpf: "56055187043",
            value: 1000
        })

        const response = await request(app).post("/transfer").send({
            fromCpf: "56055187043",
            toCpf: "41715547055",
            value: 500
        })


        expect(response.status).toBe(201)
        expect(response.text).toBe("Transfer carried out successfully")
    })

    it("Should not able to transfer to a nonexisting account", async() => {
        //Create account to send money
        await request(app).post("/account").send({
            cpf: "58601037003",
            name: "Test Integration transfer to a nonexisting account"
        })

        const response = await request(app).post("/transfer").send({
            fromCpf: "58601037003",
            toCpf: "32244246051",
            value: 500
        })

        //Get balance of a nonexisting account
        expect(response.status).toBe(400)
        expect(response.text).toBe("Account to be credited does not exist")
    })

})

