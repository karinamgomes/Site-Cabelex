import { UsersRepositories } from "../respositories/UserRepositories";
import {getCustomRepository} from "typeorm";
import { hash } from "bcryptjs";
import { classToPlain } from "class-transformer";

interface CreateUserInterface{
    name:string;
    email:string;
    password:string;
}

export default class UserServices{
    async create({name,email,password}:CreateUserInterface){
            const userRepository= await getCustomRepository(UsersRepositories);

            if(!email)
                throw new Error("The email field is required");
            
            const userAlreadyExist = await userRepository.findOne({email});

            if(userAlreadyExist)
                throw new Error("User already exists");
            
            const emailLowCase = email.toLowerCase();

            const passwordHash = await hash(password,8);

            const user = userRepository.create({
                name,
                email:emailLowCase,
                password : passwordHash
            });

            await userRepository.save(user);

            return classToPlain(user);

    }
}
