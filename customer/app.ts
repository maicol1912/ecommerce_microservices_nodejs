import express, { Application, Request, Response } from "express";
import cors from "cors"
import * as config from "./src/config/configApp"
import { connectDB } from "./src/database/connection";

export default class App {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = config.PORT
        this.listen()
        this.midlewares()
        this.routes()
        this.dbconnect()
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server initialized in port ${this.port}`)
        })
    }

    routes() {
        this.app.get("/", (req: Request, res: Response) => {
            res.send("hello from customer")
        })
    }

    midlewares() {
        this.app.use(cors())
        this.app.use(express.json())
    }

    async dbconnect() {
        await connectDB()
    }
}