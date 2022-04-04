import express from "express"
import cors from "cors"
import dotenv from "dotenv"
require("express-async-errors")
import {router} from "./routes"
import mongoose from "mongoose"


class App {
    public express: express.Application

    public constructor() {
        this.express = express()

        this.middlewares()
        this.database()
        this.routes()
    }

    private middlewares(): void {
        this.express.use(express.json())
        this.express.use(cors())
        dotenv.config()

    }

    private database(): void {
        mongoose.connect(process.env.MONGODB_URI)
    }

    private routes(): void {
        this.express.use(router)
    }
}



export default new App().express
