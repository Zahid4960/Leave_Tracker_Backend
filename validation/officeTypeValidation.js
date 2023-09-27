const joi = require('joi')


const officeTypeValidationSchema = joi.object({
    officeType: joi.string().required(),
    description: joi.string().required()
})

module.exports = officeTypeValidationSchema