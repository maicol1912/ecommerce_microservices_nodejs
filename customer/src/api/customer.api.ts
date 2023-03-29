import { Application, NextFunction, Request, Response } from "express";
import { CustomerService } from "../services/customer-service";
import { UserAuth } from "./middlewares/auth";

(app: Application)=>{

    const service = new CustomerService();

    app.post('/customer/signup',async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const {email,password,phone} = req.body
            const {data} = await service.SignUp({email,password,phone})
            return res.json(data)
        }catch(err){
            next(err)
        }
    });

    app.post('/customer/login', async (req: Request, res: Response, next: NextFunction)=>{
        try{
            const {email,password} = req.body;
            const {data} = await service.SignIn({email,password})

            return res.json(data);
        }catch(err){
            next(err)
        }
    });

    app.post('/address', UserAuth, async (req:any, res:any, next:any) => {

        const { _id } = req.user;


        const { street, postalCode, city, country } = req.body;

        const { data } = await service.AddNewAddress(_id, { street, postalCode, city, country });

        res.json(data);

    });


}