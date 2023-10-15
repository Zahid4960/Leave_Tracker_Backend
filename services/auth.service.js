const SuccessLoginPayload = require('../payload/success-login.payload')
const { convertIsoDateTimeToUTCDateTime } = require('../helpers/settings.helper')
const { 
    isUserExistOrNotByEmail, 
    findUserByEmail,
    matchPassword,
    generateToken,
    tokenExpiresAt
} = require('../repositories/auth.repo')


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
        let user = await findUserByEmail(email)
       
        let isPasswordMatched = await matchPassword(password, user.password)

        if(isPasswordMatched){
            let token = await generateToken(user.email, process.env.JWT_SECRET, isRemember)

            let tokenExpiry = await tokenExpiresAt(token)

            user.token = token
            user.isRemember = isRemember
            user.save()
            
            const payload = new SuccessLoginPayload()
            payload.id = user._id
            payload.firstName = user.firstName
            payload.email = user.email
            payload.token = token
            payload.tokenExpiresAt = convertIsoDateTimeToUTCDateTime(tokenExpiry)
            payload.userType = user.userType

            return payload
        }
        else{
            throw new Error('Password does not match!')
        }
    }
    else{
        throw new Error('User does not exist!')
   }
}