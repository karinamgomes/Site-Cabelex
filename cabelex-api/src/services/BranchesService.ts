import { getCustomRepository } from "typeorm";
import { BranchRepositories } from '../respositories/BranchesRepositories';
import { classToPlain } from 'class-transformer';


export default class BranchesService {
    async create(name: string) {
        const branchRepositories = getCustomRepository(BranchRepositories);

        if (!name)
            throw new Error("The name field is required");

        const nameAlreadyExists = await branchRepositories.findOne({ name });

        if (nameAlreadyExists)
            throw new Error("there is already a branch registered with that name");

        const branchName = branchRepositories.create({ name });

        await branchRepositories.save(branchName);

        return branchName;
    }

    async list() {

        const branchRepository = getCustomRepository(BranchRepositories);

        const branches = await branchRepository.find();

        return classToPlain(branches);

    }

    async find(id: number) {

        const branchRepository = getCustomRepository(BranchRepositories);

        const branch = await branchRepository.findOne({
            where: {
                id: id
            }
        });

        if (!branch)
            throw new Error("branch not found");

        return classToPlain(branch);
    }

    async update(id: number, name: string) {

        const branchRepository = getCustomRepository(BranchRepositories);

        if (!id)
            throw new Error("The id field is required");

        if (!name)
            throw new Error("the name field is required");

        const exist = await branchRepository.findOne({ id });

        if (!exist)
            throw new Error("the selected id does not exist");

        return classToPlain(await branchRepository.update({ id: id }, { name: name }));
    }

    async delete(id: number) {
        if (!id) 
            throw new Error("the id field is required");

        const branchRepository = getCustomRepository(BranchRepositories);

        const exist = await branchRepository.findOne({id});

        if(!exist)
            throw new Error("there is no branch with that id");

        await branchRepository.delete({ id: id });

        return "branch deleted";
    }
}
