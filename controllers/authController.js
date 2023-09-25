const { login } = require('../services/authService')
const { 
    sendsuccessResponse, 
    sendErrorResponse,
    sendExceptionResponse 
} = require('../helpers/responseHelper')


/**
 * controller to handle login functionality
 * @param {*} req 
 * @param {*} res 
 */
exports.logIn = async (req, res) => {
    let { email, password, isRemember } = req.body
    try{
      let data = await login(email, password, isRemember)

      sendsuccessResponse(res, 200, 'User data found!', data)
    }catch(err){
        console.error(err)
        sendExceptionResponse(res, err)
    }
}
