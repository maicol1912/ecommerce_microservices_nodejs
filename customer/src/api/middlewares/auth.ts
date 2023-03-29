import { NextFunction,Response, Request } from "express";

const { ValidateSignature } = require('../../utils');

export const UserAuth = async (req:Request, res:Response, next:NextFunction) => {

    const isAuthorized = await ValidateSignature(req);

    if (isAuthorized) {
        return next();
    }
    return res.status(403).json({ message: 'Not Authorized' })
}