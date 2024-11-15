// const { isUserExistOrNotByEmail, findUserByEmail, matchPassword, generateToken } = require('../repositories/auth.repo')
// const CustomException  = require('../utilities/customException')


// /**
//  * service function to handle login functionality
//  * @param {string} email
//  * @param {string} password
//  * @param {boolean} isRemember
//  * @returns {*} exception || user payload on successful login
//  */
// exports.login = async (payload) => {
//     const  { email, password, isRemember } = payload
//     const isUser = await isUserExistOrNotByEmail(email)

//    if(isUser){
//         let user = await findUserByEmail(email)
       
//         let isPasswordMatched = await matchPassword(password, user.password)

//         if(isPasswordMatched){
//             user.token = await generateToken(user.email, process.env.JWT_SECRET, isRemember)
//             user.isRemember = isRemember
//             user.save()

//             return user
//         }
//         else{
//             throw new CustomException(409, 'Password does not match!')
//         }
//     }
//     else{
//        throw new CustomException(404, 'User does not exist!')
//    }
// }

const authRepo = require('../repositories/authRepo')
const authHelper = require('../utilities/helpers/authHelper')
const { CustomException } = require('../utilities/responses')
const { STATUS_CODES } = require('../utilities/constants')
const { SignupSuccessResponseDTO } = require('../dto/authDTO')

class AuthService {
    constructor(authRepo) {
        this.authRepo = authRepo
        this.authHelper = authHelper
    }

    async signup(payload) {
        /**
         * Handles the signup business logic.
         * - Checks if a user with the given email already exists in the repository.
         * - If the user does not exist:
         *   - Encrypts the user's password using `authHelper.hashPassword`.
         *   - Creates a new user in the repository with the provided payload.
         *   - Maps the created user's data to a `SignupSuccessResponseDTO` object and returns it.
         * - If the user exists, throws a `CustomException` with a conflict status code.
         */
        const user = await authRepo.findUserByEmail(payload.email)

        if (!user) {
            const encryptPassword = await this.authHelper.hashPassword(payload.password)
            payload.password = encryptPassword
            
            const createdUser = await authRepo.createUser(payload)
            
            const response = new SignupSuccessResponseDTO()
            response.id = createdUser.id
            response.firstName = createdUser.firstName
            response.lastName = createdUser.lastName
            response.email = createdUser.email
            response.isAccountActivatedByOwner = createdUser.isAccountActivatedByOwner
            response.userType = createdUser.userType
            
            return response
        }

        throw new CustomException(STATUS_CODES.CONFLICT, 'User already exists')
    }
}

module.exports = new AuthService()