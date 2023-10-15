const { login } = require('../services/auth.service')
const { successResponse, exceptionResponse } = require('../helpers/response.helper')


/**
 * controller to handle login functionality
 * @param {*} req 
 * @param {*} res 
 * @returns successResponse || exceptionResponse
 */
exports.logIn = async (req, res) => {
    let { email, password, isRemember } = req.body
    try{
      let data = await login(email, password, isRemember)

      return successResponse(res, 200, 'User data found!', data)
    }catch(err){
        console.error(err)
        return exceptionResponse(res, err)
    }
}
