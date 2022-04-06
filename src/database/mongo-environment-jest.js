/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const NodeEnvironment = require("jest-environment-node")
const {default: mongoose} = require("mongoose")
const {v4: uuid} = require("uuid")
const {resolve} = require("path")

require("dotenv").config({
    path: resolve(__dirname, "..", "..", ".env.test"),
})

class CustomEnvironment extends NodeEnvironment {

    constructor(config, context) {
        super(config, context)
        this.schema = `test_schema_${uuid()}`
        this.connectionString = `${process.env.MONGODB_URI}${this.schema}`
    }

    setup() {
        process.env.MONGODB_URI = this.connectionString
        this.global.process.env.MONGODB_URI = this.connectionString
    }

    async teardown() {
        mongoose.disconnect()
        await mongoose.connection.dropDatabase((error) => {
            console.log(error)
        })
    }
}

module.exports = CustomEnvironment