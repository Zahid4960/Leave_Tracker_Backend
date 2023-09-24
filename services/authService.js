const userModel = require('../models/userModel')
const authRepo = require('../repositories/authRepo')


/**
 * service to handle login functionality
 * @param {*} email 
 * @param {*} password 
 * @param {*} isRemember 
 * @returns exception || user payload on successful login
 */
exports.login = async (email, password, isRemember) => {
   let isUser = await authRepo.isUserExistOrNotByEmail(email)

   if(isUser){
        let user = await userModel.find({ email: email })
        let hashedPassword = user[0].password

        let isPasswordMatched = await authRepo.matchPassword(password, hashedPassword)

        if(isPasswordMatched){
            let userPayload = {
                id: user[0]._id,
                firstName: user[0].firstName,
                email: user[0].email,
                token: user[0].token,
                userType: user[0].userType
            }

            return userPayload
        }else{
            return 'Password not matched'
        }
   }else{
        return 'not user'
   }
}