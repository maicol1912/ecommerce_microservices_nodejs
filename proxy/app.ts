import express, { Application, Request, Response } from "express";
import dotenv from "dotenv"
import cors from "cors"
import proxy from "express-http-proxy"

export default class App {
    private app: Application;
    private port: string;

    constructor() {
        if (process.env.NODE_ENV != 'prod') {
            dotenv.config({ path: '.env.dev' })
        }
        else {
            dotenv.config({ path: `.env.prod` })
        }
        this.app = express();
        this.port = process.env.PORT || '3004'
        this.listen()
        this.midlewares()
        this.proxy()
        this.dbconnect()
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server initialized in port ${this.port}`)
        })
    }

    proxy() {
        this.app.use('/customer', proxy('http://localhost:3001'))
        this.app.use('/product', proxy('http://localhost:3002'))
        this.app.use('/shopping', proxy('http://localhost:3003'))
    }

    midlewares() {
        this.app.use(cors())
        this.app.use(express.json())
    }

    async dbconnect() {

    }
}
