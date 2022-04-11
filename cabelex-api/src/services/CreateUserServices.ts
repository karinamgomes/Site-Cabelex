import { UsersRepositories } from "../respositories/UserRepositories";
import {getCustomRepository} from "typeorm";
import { hash } from "bcryptjs";
import { classToPlain } from "class-transformer";

interface Props{
    name:string;
    email:string;
    password:string;
}


class createUserServices{
    async execute({name,email,password}:Props){
       
            const userRepository= await getCustomRepository(UsersRepositories);

            if(!email){
                throw new Error("Email incorrect");
            }
            const userAlreadyExist = await userRepository.findOne({
                email
            });

            if(userAlreadyExist){
                throw new Error("Usuário já existe");
            }
            const passwordHash = await hash(password,8);

            const user = userRepository.create({
                name,
                email,
                password : passwordHash
            });

            await userRepository.save(user);

            return classToPlain(user);

    }
}

export  {createUserServices};