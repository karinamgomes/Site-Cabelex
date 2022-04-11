import { getCustomRepository } from "typeorm";
import {compare} from 'bcryptjs';
import { UsersRepositories } from "../respositories/UserRepositories";
import {sign} from 'jsonwebtoken';
import { classToPlain } from "class-transformer";

interface AuthenticateRequestInterface{
    email:string;
    password:string;
}

class AuthenticateUserService{
    async execute({email,password}:AuthenticateRequestInterface){
        const userRepositories = getCustomRepository(UsersRepositories);
        console.log("password")
        const user = await userRepositories.findOne({email});

        if(!user)
            throw new Error("email/password incorrect");
        
            
        const passwordMatch = await compare(password,user.password);

        if(!passwordMatch)
            throw new Error("email/password incorrect");
        
        const token = sign({},"2c43fbfe7b6e5449691d489b7439265354b0899f395a7ce945270ee2bb3e1139",{
            subject: user.id.toString(),
            expiresIn:"1d"
        });

        const response = {
            user:user,
            token:token
        }
        return classToPlain(response);
    }
}

export {AuthenticateUserService};