import { Request, Response } from 'express';
import { CreateFiliaisService, ListFiliaisService, UpdateFilialsService, DeleteFilialsService,FindFiliaisService } from '../services/FiliaisService';
import { FindEmployeesByFiliaisService } from '../services/EmployeesService';

class CreateFiliasController {
    async handle(request: Request, response: Response) {
        const { name } = request.body;
        const createFilialService = new CreateFiliaisService;
        const filial = await createFilialService.execute(name);

        const resp = {
            id: filial.id,
            name: filial.name,
            created_at: filial.created_at,
            updated_at: filial.updated_at,
            numberFuncionarios: 0
        }
        return response.status(200).json(resp);
    }
}


class ListFiliaisController {
    async handle(request: Request, response: Response) {
        const listFiliaisService = new ListFiliaisService();
        const findEmployeesByFiliaisService = new FindEmployeesByFiliaisService();
        const filiais = await listFiliaisService.execute();

        const promises = filiais.map(async item => {
            item.numberFuncionarios = await (await findEmployeesByFiliaisService.execute(item.id)).length;
        });

        await Promise.all(promises);

        return response.json(filiais);
    }
}
class GetFilialFuncionariosController {
    async handle(request: Request, response: Response) {
        const { id } = request.query;
        const findFiliaisService = new FindFiliaisService();
        const findEmployeesByFiliaisService = new FindEmployeesByFiliaisService();
        const filiais = await findFiliaisService.execute(id.toString());


        filiais.funcionarios = await findEmployeesByFiliaisService.execute(id.toString());
        
        return response.json(filiais);
    }
}
class UpdateFilialController {
    async handle(request: Request, response: Response) {
        const { name, id } = request.body;
        const updateFilialsService = new UpdateFilialsService();
        const filial = await updateFilialsService.execute(id, name);
        return response.json(filial);
    }
}

class DeleteFilialController {
    async handle(request: Request, response: Response) {
        const { id } = request.query;
        const deleteFilialsService = new DeleteFilialsService();
        return response.json(deleteFilialsService.execute(id.toString()));
    }
}
export { CreateFiliasController, ListFiliaisController, UpdateFilialController,DeleteFilialController,GetFilialFuncionariosController };