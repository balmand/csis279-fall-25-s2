import { body } from 'express-validator';

export const registerUserValidator = [
    body('first_name')
        .isString()
        .isLength({ min: 1, max: 255 })
        .withMessage('First name must be a string between 1-255 characters'),

    body('last_name')
        .isString()
        .isLength({ min: 1, max: 255 })
        .withMessage('Last name must be a string between 1-255 characters'),

    body('email')
        .isEmail()
        .withMessage('Must be a valid email'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),

    body('confirm_password')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
];
