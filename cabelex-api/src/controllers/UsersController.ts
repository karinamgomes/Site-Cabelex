import{Request,Response} from 'express';
import UserServices from '../services/UserServices';

export default class UsersController{

    async create(request:Request,response:Response){
        
        const{name,email,password} = request.body;
        const createUserService = new UserServices();
             
        const user = await createUserService.create({name,email:email,password:password});
        
        return response.json(user);
    }
    
}
