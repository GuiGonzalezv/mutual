/**
 * @jest-environment ./src/database/mongo-environment-jest
*/

import app from "../../app"
import request from "supertest"

describe("Get balance Controller", () => {
    it("Should be able to get a balance of a account", async() => {
        await request(app).post("/account").send({
            cpf: "78789836514",
            name: "Test Integration debit Account"
        })

        const response = await request(app).get("/account/balance/78789836514").send()


        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("cpf")
        expect(response.body).toHaveProperty("balance")

    })

    it("Should not able to get a balance of a nonexisting account", async() => {
        //Get balance of a nonexisting account
        const response = await request(app).get("/account/balance/98719836514").send()
        expect(response.status).toBe(400)
        expect(response.text).toBe("Account not found.")
    })

})

