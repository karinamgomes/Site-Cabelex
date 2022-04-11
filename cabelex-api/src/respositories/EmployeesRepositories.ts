import {EntityRepository,Repository} from "typeorm";
import {Employees} from '../entities/Employees';

@EntityRepository(Employees)
class EmployeesRepositories extends  Repository<Employees>{
    
}

export {EmployeesRepositories};