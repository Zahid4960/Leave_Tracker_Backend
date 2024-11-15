const AuthValidator = require('../validation/authValidator')
const authService = require('../services/authService')
const { responseHandler } = require('../utilities/responseHandler')
const { SignupDTO } = require('../dto/authDTO')
const { SuccessResponse, ErrorResponse, ExceptionResponse } = require('../utilities/responses')

class AuthController {
    constructor(authService) {
        this.authService = authService
    }

    async signup(req, res) {
        try {
            const { error } = AuthValidator.validateSignupSchema(req.body)

            if (error) {
                return responseHandler(res, new ErrorResponse(400, error.details))
            }

            const payload = new SignupDTO()
            payload.firstName = req.body.firstName
            payload.lastName = req.body.lastName
            payload.email = req.body.email
            payload.password = req.body.password

            const data = await authService.signup(payload)

            return responseHandler(res, new SuccessResponse(200, 'Signup successful', data))
        } catch(error) {
            responseHandler(res, new ExceptionResponse(error))
        }
    }

    async signin(req, res) {
        res.status(200).json({ 
            status: 'success',
            statusCode: 200,
            message: 'Signin successful'
        })
    }
}

module.exports = new AuthController()