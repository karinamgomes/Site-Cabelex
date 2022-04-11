import { EmployeesRepositories } from "../respositories/EmployeesRepositories";
import { getCustomRepository } from "typeorm";
import { classToPlain } from 'class-transformer';

interface Props {
    name: string;
    branch_id: number;
}

export default class EmployeesServices {
    async create({ name, branch_id }: Props) {
        const employeesRepositories = await getCustomRepository(EmployeesRepositories);

        if (!name)
            throw new Error("The name field is required");

        const employeeAlreadyExist = await employeesRepositories.findOne({ name });

        if (employeeAlreadyExist)
            throw new Error("employee already exists");

        const employeesave = employeesRepositories.create({
            name,
            branch_id,
        });

        await employeesRepositories.save(employeesave);

        const employee = await employeesRepositories.find({
            where: {
                id: employeesave.id
            },
            relations: ["branch"]
        });

        return employee;

    }

    async list() {
        const employeesRepositories = getCustomRepository(EmployeesRepositories);

        const employees = await employeesRepositories.find({
            relations: ["branch"]
        });

        return classToPlain(employees);
    }

    async delete(id: number) {
        if (!id)
            throw new Error("the id field is required");

        const employeesRepositories = getCustomRepository(EmployeesRepositories);

        const exist = await employeesRepositories.findOne({id});

        if (!exist)
            throw new Error("No employee with this id was found");

        await employeesRepositories.delete({ id: id });

        return "branch deleted";
    }

    async find(id: number) {
        const employeesRepositories = getCustomRepository(EmployeesRepositories);

        const employees = await employeesRepositories.findOne({id});

        return employees;
    }

    async findByBranch(branch_id: number) {
        const employeesRepositories = getCustomRepository(EmployeesRepositories);

        const employees = await employeesRepositories.find({
            where: {
                branch_id: branch_id
            },
        });

        return employees;
    }

    async update(id: number, name: string = "", branch_id: number) {
        const employeesRepositories = getCustomRepository(EmployeesRepositories);

        const exist = await employeesRepositories.findOne({ id });

        if (!exist)
            throw new Error("id does not exist");

        if (name != "" && branch_id)
            await employeesRepositories.update({ id: id }, { name: name, branch_id: branch_id });
        else if (name != "")
            await employeesRepositories.update({ id: id }, { name: name });
        else
            await employeesRepositories.update({ id: id }, { branch_id: branch_id });


        const employees = await employeesRepositories.findOne({
            where: {
                id: id
            },
            relations: ["branch"]
        });


        return employees;
    }

}
