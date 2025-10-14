import { validationResult } from "express-validator";
import { UserService } from "../services/UserService.js";

const userService = new UserService(); 

export class UserController {
    constructor(userServiceInstance = userService) {
        this.userService = userServiceInstance;
    }

    // Private validation helper
    _validate(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return null;
    }

    // Registration endpoint
    register = async (req, res, next) => {
        try {
            if (this._validate(req, res)) {
                return;
            }

            const user = await this.userService.registerUser(req.body);
            res.status(201).json(user);
        } catch (e) {
            // Handle duplicate email error
            if (e.message === "Email already registered") {
                return res.status(400).json({ message: e.message });
            }
            next(e); // Pass other errors to global error handler
        }
    };
}
