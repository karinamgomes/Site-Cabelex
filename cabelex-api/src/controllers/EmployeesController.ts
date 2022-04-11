import { Request, Response } from 'express';
import EmployeesServices from '../services/EmployeesService';


export default class EmployeesController {

    async create(request: Request, response: Response) {

        const { name, branch_id } = request.body;
        const employeesServices = new EmployeesServices();

        const employees = await employeesServices.create({ name, branch_id });

        return response.json(employees);
    }

    async list(request: Request, response: Response) {
        const employeesServices = new EmployeesServices();

        const employees = await employeesServices.list();

        return response.json(employees);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { name, branch_id } = request.body;
        const employeesServices = new EmployeesServices();

        if (!name)
            throw new Error("The name field is required");
        if (!id)
            throw new Error("The id field is required");
        if (!branch_id)
            throw new Error("The branch_id field is required");

        const employee = await employeesServices.update(Number(id), name, branch_id);

        return response.json(employee);
    }

    async delete(request: Request, response: Response) {

        const { id } = request.params;

        if (!id)
            throw new Error("The id field is required");

        const employeesServices = new EmployeesServices();

        await employeesServices.delete(Number(id));

        return response.json({"message":"success"});

    }
}
