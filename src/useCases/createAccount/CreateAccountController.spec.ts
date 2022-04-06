/**
 * @jest-environment ./src/database/mongo-environment-jest
*/

import app from "../../app"
import request from "supertest"

describe("Create Account Controller", () => {
    it("Should be able to create a account", async() => {
        const response = await request(app)
            .post("/account")
            .send({
                cpf: "12345678999",
                name: "Test Integration Create Account"
            })

        expect(response.status).toBe(201)
        expect(response.text).toBe("Account created!")
    })

    it("Should not be able to create a account", async() => {
        await request(app)
            .post("/account")
            .send({
                cpf: "12345678910",
                name: "Test Integration Account already Exist"
            })

        const response = await request(app)
            .post("/account")
            .send({
                cpf: "12345678910",
                name: "Test Integration Account already Exist"
            })

        expect(response.status).toBe(400)
        expect(response.text).toBe("Account already exist.")
    })

})

