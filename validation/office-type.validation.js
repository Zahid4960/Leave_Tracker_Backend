const joi = require('joi')

/**
 * validation schema for office type
 */
const officeTypeValidationSchema = joi.object({
    officeType: joi.string().required(),
    description: joi.string().required()
})

module.exports = officeTypeValidationSchema