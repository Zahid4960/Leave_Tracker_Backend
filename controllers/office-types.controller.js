const officeTypeValidationSchema = require('../validation/office-type.validation')
const { store, show } = require('../services/office-type.service')
const { successResponse, errorResponse, exceptionResponse } = require('../helpers/response.helper')


/**
 * controller function to handle office type creation
 * @param {*} req 
 * @param {*} res 
 * @returns {*} successResponse || errorResponse || exceptionResponse
 */
exports.store = async (req, res) => {
   try {
        const item = req.body
        const { error } = officeTypeValidationSchema.validate(item)

        if(error){
            return errorResponse(res, 200, error.details[0].message)
        }

        const officeTypeData = await store(item)

        if(officeTypeData){
            return successResponse(res, 201, 'Office type created successfully!')
        }
   } catch (err) {
        console.error(err)
        return exceptionResponse(res, err)
   }
}


/**
 * controller function to get a specific office type by using office type id
 * @param {*} req 
 * @param {*} res 
 * @returns {*} successResponse || exceptionResponse
 */
exports.show = async (req, res) => {
    try {
        const { officeTypeId } = req.params

        const officeTypeData = await show(officeTypeId)

        return successResponse(res, 200, 'Office type data found!', officeTypeData)
    } catch (err) {
        console.error(err)
        return exceptionResponse(res, err)
    }
}