import {EntityRepository,Repository} from "typeorm";
import {Filiais} from '../entities/Filiais';

@EntityRepository(Filiais)
class FiliaisRepositories extends  Repository<Filiais>{
    
}

export {FiliaisRepositories};