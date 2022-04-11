import {Router} from 'express';
import UsersController from './controllers/UsersController';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import BranchController from './controllers/BranchController';
import EmployeesController from './controllers/EmployeesController';
import {EnsureAuthenticated} from './middleware/EnsureAuthenticated';

const router = Router();

const usersController = new UsersController();
const authenticateUserController = new AuthenticateUserController();
const branchController = new BranchController();
const employeesController = new EmployeesController();

router.post('/users',usersController.create);
router.post("/login",authenticateUserController.authenticate);

router.post("/branches",EnsureAuthenticated,branchController.create);
router.get("/branches",EnsureAuthenticated,branchController.list);
router.get("/branches/:id",EnsureAuthenticated,branchController.find);
router.put("/branches/:id",EnsureAuthenticated,branchController.update);
router.delete("/branches/:id",EnsureAuthenticated,branchController.delete);

router.post("/employees",EnsureAuthenticated,employeesController.create);
router.get("/employees",EnsureAuthenticated,employeesController.list);
router.put("/employees/:id",EnsureAuthenticated,employeesController.update);
router.delete("/employees/:id",EnsureAuthenticated,employeesController.delete);


export {router};