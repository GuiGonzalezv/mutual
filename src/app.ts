import express from "express"
import cors from "cors"
import {router} from "./routes"
import mongoose from "mongoose"
import "dotenv/config"

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
    }

    private async database(): Promise<void> {
        try {
            await mongoose.connect(`${process.env.MONGODB_URI}`)
        } catch (err) {
            console.log(err)
        }
    }

    private routes(): void {
        this.express.use(router)
    }
}

export default new App().express
