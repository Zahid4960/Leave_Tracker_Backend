const { create } = require('../services/officeTypeService')
const officeTypeValidationSchema = require('../validation/officeTypeValidation')
const { 
    successResponse,
    errorResponse,
    exceptionResponse
} = require('../helpers/responseHelper')


/**
 * controller to handle office type creation
 * @param {*} req 
 * @param {*} res 
 * @returns successResponse || errorResponse || exceptionResponse
 */
exports.create = async (req, res) => {
   try {
        console.log('hit')
        const item = req.body
        const { error } = officeTypeValidationSchema.validate(item)

        if(error){
            return errorResponse(res, 200, error.details[0].message)
        }

        const officeTypeData = await create(item)
        console.log(officeTypeData)

        if(officeTypeData){
            return successResponse(res, 201, 'Office type created successfully!', officeTypeData)
        }
   } catch (err) {
        console.log(err)
        return exceptionResponse(res, err)
   }
}