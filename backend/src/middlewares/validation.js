const joi = require('joi');

const userSchema = joi.object({
    email: joi.string().email().trim().min(3).max(100).required().messages({
        'string.base': 'Email should be a string',
        'string.empty': 'Email can\'t be empty',
        'string.email': 'Enter a valid email',
        'string.min': 'The email should be a minimum of 3 characters',
        'string.max': 'The email should be a maximum of 100 characters',
        'any.required': 'Email is required'
    }),
    password: joi.string().trim().strict().min(1).max(15).required().messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password must be at least 1 characters',
        'string.max': 'Password must be at most 15 characters',
        'any.required': 'Password is required'
    }),
    confirmed_password: joi.string().valid(joi.ref('password')).required().messages({
        'any.only': 'Password and confirm password must match',
        'string.empty': 'Please confirm your password',
        'any.required': 'Password confirmation is required'
    }),
    fullname: joi.string().trim().strict().min(3).max(100).required().messages({
        'string.base': 'Fullname should be a string',
        'string.empty': 'Fullname can\'t be empty',
        'string.min': 'Fullname should be at least 3 characters',
        'string.max': 'Fullname should be a maximum of 100 characters',
        'any.required': 'Fullname is required'
    }),
    username: joi.string().trim().strict().min(1).max(50).required().messages({
        'string.base': 'Username must be a string',
        'string.empty': 'Username cannot be empty',
        'string.min': 'Username must be at least 1 characters',
        'string.max': 'Username must be at most 50 characters',
        'any.required': 'Username is required'
    }),
});

class Validation {
    async add_user(req, res, next) {
        try {
            await userSchema.validateAsync(req.body);
            next();
        } catch (error) {
            return res.status(400).json({
                error: error.details.map(detail => detail.message)
            });
        }
    }
}

module.exports = Validation;
