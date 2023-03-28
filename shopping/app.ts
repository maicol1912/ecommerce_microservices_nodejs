import express, { Application,Request,Response } from "express";
import * as config from "./config/configApp"
import cors from "cors"
import { connectDB } from "./database/connection";
export default class App {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = config.PORT || '3003'
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
            res.send("hello from shopping")
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