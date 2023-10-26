const { login } = require('../services/auth.service')
const { SuccessResponse, ErrorResponse, ExceptionResponse } = require('../utility/response')
const { responseFormatter } = require('../utility/response-formatter')
const { getSuccessLoginResponse } = require('../helpers/auth.helper')
const { loginValidationSchema } = require('../validation/auth.validation')
const { LoginDto } = require('../dto/auth.dto')


/**
 * controller function to handle login functionality
 * @param {*} req 
 * @param {*} res 
 * @returns {*} successResponse || exceptionResponse
 */
exports.logIn = async (req, res) => {
    let { email, password, isRemember } = req.body
    try{
        const { error } = loginValidationSchema.validate({email, password})

        if(error){
            return responseFormatter(res, new ErrorResponse(400, error.details[0].message))
        }

        const payload = new LoginDto()
        payload.email = email
        payload.password = password
        payload.isRemember = isRemember

        let user = await login(payload)

        const response = await getSuccessLoginResponse(user)

        responseFormatter(res, new SuccessResponse(200, 'User data found!', response))
    }catch(err){
        console.error(err)
        responseFormatter(res, new ExceptionResponse(err))
    }
}
