import { body, validationResult } from 'express-validator';

const userRegisterValidator = [
    // Validate firstName
    body('firstname').notEmpty().withMessage('First Name is required')
                    .isLength({ min: 3, max: 10 }).withMessage('First Name must be between 3 to 10 characters'),

    // Validate lastName
    body('lastname').notEmpty().withMessage('Last Name is required')
                    .isLength({ min: 3, max: 10 }).withMessage('Last Name must be between 3 to 10 characters'),

    // Validate email
    body('email').notEmpty().withMessage('Email is required')
                 .isLength({ min: 3, max: 32 }).withMessage('Email must be between 3 to 32 characters')
                 .isEmail().withMessage('Email must be valid'),

    // Validate phone
    body('phone').notEmpty().withMessage('Phone is required')
                 .isLength({ min: 10, max: 10 }).withMessage('Phone must be 10 digits'),
    
    // Validate password
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6, max: 20 }).withMessage('Password must be between 6 to 20 characters')
        .matches(/^(?=.*\d)(?=)(?=.*[a-z])(?=.*[A-Z])/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),

    // Custom middleware to handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const firstError = errors.array()[0].msg;
            return res.status(400).json({ error: firstError });
        }
        next();
    }
];

export { userRegisterValidator };