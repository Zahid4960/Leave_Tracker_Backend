const { login } = require('../services/auth.service')
const { SuccessResponse, ExceptionResponse } = require('../utility/response')
const { responseFormatter } = require('../utility/response-formatter')


/**
 * controller function to handle login functionality
 * @param {*} req 
 * @param {*} res 
 * @returns {*} successResponse || exceptionResponse
 */
exports.logIn = async (req, res) => {
    let { email, password, isRemember } = req.body
    try{
        let data = await login(email, password, isRemember)

        responseFormatter(res, new SuccessResponse(200, 'User data found!', data))
    }catch(err){
        console.error(err)
        responseFormatter(res, new ExceptionResponse(err))
    }
}
