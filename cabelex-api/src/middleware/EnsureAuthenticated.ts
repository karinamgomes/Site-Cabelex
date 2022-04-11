import { Request, Response, NextFunction, request } from "express";
import { verify } from 'jsonwebtoken';

interface Ipayload {
    sub: string;
}
export function EnsureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authToken = request.headers.authorization;

    if (!authToken) 
        return response.status(401).end();


    const [, token] = authToken.split(" ");

    try {

        const sub = verify(token, "2c43fbfe7b6e5449691d489b7439265354b0899f395a7ce945270ee2bb3e1139") as Ipayload;
        request.user_id = sub.sub;

        return next();
        
    } catch (err) {
        return response.status(401).end();
    }

}