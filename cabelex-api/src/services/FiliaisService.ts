import { getCustomRepository } from "typeorm";
import{FiliaisRepositories} from '../respositories/FiliaisRepositories';
import {classToPlain} from 'class-transformer';

class CreateFiliaisService{
    async execute(name:string){
        const filiaisRepositories = getCustomRepository(FiliaisRepositories);

        if(!name){
            throw new Error("Incorrect name!");
        }

        const nameAlreadyExists = await filiaisRepositories.findOne({
            name,
        });

        if(nameAlreadyExists){
            throw new Error("já existe uma filial cadastrada com esse nome");
            
        }
        const namefilial = filiaisRepositories.create({
            name,
        });

        await filiaisRepositories.save(namefilial);

        return namefilial;
    }
}

class ListFiliaisService{

    async execute(){

        const filiaisRepository = getCustomRepository(FiliaisRepositories);

        const filiais = await filiaisRepository.find();

        return classToPlain(filiais);

    }
}
class FindFiliaisService{

    async execute(id:string){

        const filiaisRepository = getCustomRepository(FiliaisRepositories);

        const filiais = await filiaisRepository.findOne({
            where:{
                id:id
            }
        });

        return classToPlain(filiais);

    }
}
class UpdateFilialsService{

    async execute(id:string,name:string){

        if(!id){
            throw new Error("o campo é id é requerido");
        }

        const filiaisRepository = getCustomRepository(FiliaisRepositories);
        const exist = await filiaisRepository.findOne({id});

        if(!exist){
            throw new Error("o id selecionado não existe");
        }
        if(!name){
            throw new Error("o campo name é requerido");
        }

        return classToPlain(await filiaisRepository.update({id:id},{name:name}));

    }
}

class DeleteFilialsService{
    async execute(id:string){
        if(!id){
            throw new Error("o campo id é requerido");
        }
        const filiaisRepository = getCustomRepository(FiliaisRepositories);
        filiaisRepository.delete({id:id});
        return "Filial deletada";
    }
}


export {CreateFiliaisService,ListFiliaisService,UpdateFilialsService,DeleteFilialsService,FindFiliaisService};