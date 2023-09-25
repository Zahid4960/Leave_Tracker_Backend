const userModel = require('../models/userModel')
const { 
    isUserExistOrNotByEmail, 
    matchPassword,
    generateToken,
    tokenExpiresAt
} = require('../repositories/authRepo')


/**
 * service to handle login functionality
 * @param {*} email 
 * @param {*} password 
 * @param {*} isRemember 
 * @returns exception || user payload on successful login
 */
exports.login = async (email, password, isRemember) => {
   let isUser = await isUserExistOrNotByEmail(email)

   if(isUser){
        let user = await userModel.findOne({ email: email })
       
        let isPasswordMatched = await matchPassword(password, user.password)

        if(isPasswordMatched){
            let token = await generateToken(user.email, process.env.JWT_SECRET, isRemember)

            let tokenExpiry = await tokenExpiresAt(token)

            user.token = token
            user.isRemember = isRemember
            user.save()
            
            let userPayload = {
                id: user._id,
                firstName: user.firstName,
                email: user.email,
                token: token,
                tokenExpiresAt: tokenExpiry,
                userType: user.userType
            }

            return userPayload
        }
        else{
            throw new Error('Password does not match!')
        }
    }
    else{
        throw new Error('User does not exist!')
   }
}