import express, { Application, Request, Response } from "express";
import dotenv from "dotenv"
import cors from "cors"

export default class App {
    private app: Application;
    private port: string;

    constructor() {
        if (process.env.NODE_ENV != 'prod') {
            dotenv.config({ path: '.env.dev' })
        }
        else{
            dotenv.config({path:`.env.prod`})
        }
        this.app = express();
        this.port = process.env.PORT || '3001'
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

    }
}