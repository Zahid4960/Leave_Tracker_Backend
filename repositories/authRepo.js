const userModel = require('../models/userModel')


/**
 * check if user exist or not by given email
 * @param {*} email 
 * @returns boolean
 */
exports.isUserExistOrNotByEmail = async (email) => {
    let user = await userModel.find({ email: email })

    return user.length > 0 ? true : false
}