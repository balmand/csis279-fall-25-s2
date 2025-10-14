import { validationResult } from 'express-validator';

export class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    register = async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Validation failed',
                    errors: errors.array()
                });
            }

            const result = await this.authService.register(req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    };

    login = async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Validation failed',
                    errors: errors.array()
                });
            }

            const result = await this.authService.login(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    me = async (req, res, next) => {
        try {
            const { userId } = req.user;
            const user = await this.authService.getProfile(userId);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    logout = async (_req, res) => {
        res.status(204).send();
    };
}
