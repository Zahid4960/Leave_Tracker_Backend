const { isUserExistOrNotByEmail, findUserByEmail, matchPassword, generateToken } = require('../repositories/auth.repo')
const CustomException  = require('../utility/custom-exception')


/**
 * service function to handle login functionality
 * @param {string} email
 * @param {string} password
 * @param {boolean} isRemember
 * @returns {*} exception || user payload on successful login
 */
exports.login = async (payload) => {
    const  { email, password, isRemember } = payload
    const isUser = await isUserExistOrNotByEmail(email)

   if(isUser){
        let user = await findUserByEmail(email)
       
        let isPasswordMatched = await matchPassword(password, user.password)

        if(isPasswordMatched){
            user.token = await generateToken(user.email, process.env.JWT_SECRET, isRemember)
            user.isRemember = isRemember
            user.save()

            return user
        }
        else{
            throw new CustomException(409, 'Password does not match!')
        }
    }
    else{
       throw new CustomException(404, 'User does not exist!')
   }
}