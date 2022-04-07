/**
 * @jest-environment ./src/database/mongo-environment-jest
*/

import app from "../../app"
import request from "supertest"

describe("Handle Error", () => {

    it("Should return validation error", async() => {

        const response = await request(app)
            .post("/account")
            .send({
                WrongCpf: ["31542171008"],
                WrongName: []
            })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
    })

    it("Should return Bad Request Error", async() => {

        const response = await request(app)
            .post("/account")
            .send({
                cpf: {},
                name: {}
            })

        expect(response.status).toBe(500)
    })

})