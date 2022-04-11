import {EntityRepository,Repository} from "typeorm";
import {Branches} from '../entities/branches';

@EntityRepository(Branches)
class BranchRepositories extends  Repository<Branches>{
    
}

export {BranchRepositories};