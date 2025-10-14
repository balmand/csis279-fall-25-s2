import { Router } from 'express';
import { UserRepository } from '../domain/repositories/UserRepository.js';
import { UserService } from '../services/UserService.js';
import { UserController } from '../controllers/UserController.js';
import { registerUserValidator } from '../validators/userValidators.js';


const repo = new UserRepository();
const service = new UserService(repo);
const controller = new UserController(service);

export const userRoutes = Router();

userRoutes.post('/register', registerUserValidator, controller.register);
