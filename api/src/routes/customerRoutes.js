import {Router} from 'express'
import { CustomerController } from '../controllers/CustomerController.js';
import { CustomerRepository } from '../domain/repositories/CustomerRepository.js'
import { CustomerService } from '../services/CustomerService.js'
import { customerValidationRules } from '../validators/customerValidator.js';

export const customerRoutes = Router();

const repo = new CustomerRepository();
const service = new CustomerService(repo);
const controller = new CustomerController(service);

customerRoutes.get('/', controller.list);
customerRoutes.get('/:id', controller.get);
customerRoutes.post('/', customerValidationRules ,controller.create);
customerRoutes.put('/:id', controller.update);
customerRoutes.delete('/:id', controller.delete);
