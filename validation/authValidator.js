const Joi = require('joi')

class AuthValidator {
    constructor() {
        this.signupSchema = Joi.object({
            firstName: Joi.string().required().max(50),
            lastName: Joi.string().max(50),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        })
    }

    validateSignupSchema(data) {
        return this.signupSchema.validate(data, { abortEarly: false })
    }
}

module.exports = new AuthValidator()