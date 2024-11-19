const AuthValidator = require('../validation/authValidator')
const authService = require('../services/authService')
const { responseHandler } = require('../utilities/responseHandler')
const { STATUS_CODES } = require('../utilities/constants')
const { SignupDTO } = require('../dto/authDTO')
const { SuccessResponse, ErrorResponse, ExceptionResponse } = require('../utilities/responses')

class AuthController {
    constructor(authService) {
        this.authService = authService
    }

    async signup(req, res) {
        /**
         * Handles the user signup process.
         * - Validates the request body using `AuthValidator`.
         * - Maps the validated data to a `SignupDTO` object.
         * - Calls the `authService.signup` method to handle business logic.
         * - Responds with a success or error response based on the operation's result.
         */
        try {
            const { error } = AuthValidator.validateSignupSchema(req.body)

            if (error) {
                return responseHandler(res, new ErrorResponse(STATUS_CODES.BAD_REQUEST, error.details))
            }

            const payload = new SignupDTO()
            payload.firstName = req.body.firstName
            payload.lastName = req.body.lastName
            payload.email = req.body.email
            payload.password = req.body.password

            const data = await authService.signup(payload)

            return responseHandler(res, new SuccessResponse(STATUS_CODES.OK, 'Signup successful', data))
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