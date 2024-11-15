const { SuccessLoginDto } = require('../dto/auth.dto')
const { tokenExpiresAt } = require('../repositories/auth.repo')
const { convertIsoDateTimeToUTCDateTime } = require('../helpers/settings.helper')


/**
 * helper function to get formatted response for success login
 * @param {*} user
 * @returns {*} formatted response for success login
 */
exports.getSuccessLoginResponse = async (user) => {
    const { id, firstName, email, isRemember, token, userType} = user

    const tokenExpDate = await tokenExpiresAt(token)

    const response = new SuccessLoginDto()
    response.id = id
    response.firstName = firstName
    response.email = email
    response.isRemember = isRemember
    response.token = token
    response.tokenExpiresAt = await convertIsoDateTimeToUTCDateTime(tokenExpDate)
    response.userType = userType

    return response
}