const joi = require('joi')


/**
 * validation schema for login
 */
exports.loginValidationSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})