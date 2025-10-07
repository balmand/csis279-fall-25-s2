import { body, param } from 'express-validator';

export const customerValidationRules = [
    body('name')
        .isString().withMessage('Name must be a string')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters')
        .notEmpty().withMessage('Name is required'),
    body('email')
        .isEmail().withMessage('Invalid email')
        .notEmpty().withMessage('Email is required'),
    body('phone')
        .optional()
        .matches(/^[0-9+\-\s()]{7,20}$/).withMessage('Invalid phone number'),
    body('address')
        .optional()
        .isString().withMessage('Address must be a string')
        .isLength({ max: 255 }).withMessage('Address must be at most 255 characters')
];

export function validateCustomer(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}