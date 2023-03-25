import express,{ Application,Request,Response } from "express";
import dotenv from "dotenv"
import cors from "cors"
export default class App{
    private app:Application;
    private port:string;

    constructor(){
        dotenv.config()
        this.app = express();
        this.port = process.env.PORT || '3002'
        this.listen()
        this.midlewares()
        this.routes()
        this.dbconnect()
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Server initialized in port ${this.port}`)
        })
    }

    routes(){
        this.app.get("/", (req: Request, res: Response) => {
            res.send("hello from product")
        })
    }

    midlewares(){
        this.app.use(cors())
        this.app.use(express.json())
    }

    async dbconnect(){

    }
}