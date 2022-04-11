import{Request,Response} from 'express';
import { createUserServices } from '../services/CreateUserServices';

class CreateUsersController{

    async handle(request:Request,response:Response){
        
        const{name,email,password} = request.body;
        const createUserService = new createUserServices();

        const emaillow = email.toLowerCase();
        const passwordlow = password.toLowerCase();
        const user = await createUserService.execute({name,email:emaillow,password:passwordlow});
        
        return response.json(user);
    }
    
}

export {CreateUsersController};