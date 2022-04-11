import { Request, Response } from 'express';
import BranchesService from '../services/BranchesService';
import EmployeesServices from '../services/EmployeesService';


 export default class BranchController{
    async create(request: Request, response: Response) {
        const { name } = request.body;
        const branchesService = new BranchesService;
        const branch = await branchesService.create(name);

        const resp = {
            id: branch.id,
            name: branch.name,
            created_at: branch.created_at,
            updated_at: branch.updated_at,
            numberEmployees: 0
        }
        return response.status(200).json(resp);
    }

    async list(request: Request, response: Response) {
        const branchesService = new BranchesService;
        const employeesServices = new EmployeesServices();
        const branches = await branchesService.list();

        const promises = branches.map(async item => {
            item.numberEmployees = await (await employeesServices.findByBranch(item.id)).length;
        });

        await Promise.all(promises);

        return response.json(branches);
    }

    async find(request: Request, response: Response) {
        const { id } = request.params;
        const branchesService = new BranchesService;
        const employeesServices = new EmployeesServices();
        const branches = await branchesService.find(Number(id));
        branches.employees = await employeesServices.findByBranch(Number(id));

        return response.json(branches);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { name } = request.body;
        const branchesService = new BranchesService;

        await branchesService.update(Number(id), name);
        const result = await branchesService.find(Number(id));

        return response.json(result);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const branchesService = new BranchesService;
        
        await branchesService.delete(Number(id))

        return response.json({"message":"success"});

    }

}
