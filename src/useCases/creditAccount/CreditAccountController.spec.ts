/**
 * @jest-environment ./src/database/mongo-environment-jest
*/

import app from "../../app"
import request from "supertest"

describe("Credit Account Controller", () => {
    it("Should be able to credit a account", async() => {
        await request(app).post("/account").send({
            cpf: "98765432182",
            name: "Test Integration Credit Account"
        })

        const response = await request(app).post("/account/credit").send({
            cpf: "98765432182",
            value: 1000
        })

        expect(response.status).toBe(201)
        expect(response.text).toBe("Credit realized with success")
    })

    it("Should not be able to credit a account", async() => {
        const response = await request(app)
            .post("/account/credit")
            .send({
                cpf: "08265332782",
                name: "Test Integration Account not found on credit"
            })

        expect(response.status).toBe(404)
        expect(response.text).toBe("Account to be credited does not exist")
    })

})

