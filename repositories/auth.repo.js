const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


/**
 * repository function to check if user exist or not by given email
 * @param {string} email
 * @returns boolean
 */
exports.isUserExistOrNotByEmail = async (email) => {
    let user = await UserModel.findOne({ email: email })

    return user !== null
}


/**
 * repository function to find user by email
 * @param {string} email
 * @returns {*} user
 */
exports.findUserByEmail = async (email) => {
    return await UserModel.findOne({ email: email })
}


/**
 * repository function to create hashed/encrypted password
 * @param {string} plainPassword
 * @param {string} salt
 * @returns {*} hashed/encrypted password
 */
exports.generateHashedPassword = async (plainPassword, salt) => {
    return await bcrypt.hash(plainPassword, parseInt(salt))
}


/**
 * repository function to generate jwt token
 * @param {string} email
 * @param {string} secret
 * @param {boolean} isRemember
 * @returns {string} jwt token
 */
exports.generateToken = async (email, secret, isRemember = false) => {
    return await jwt.sign(
        { email: email}, 
        secret, 
        isRemember === true ? { expiresIn: '24h'} : { expiresIn: '1h'}
    )
}


/**
 * repository function to match user inputted password & hashed/encrypted password
 * @param {string} plainPassword
 * @param {string} hashedPassword
 * @returns {boolean} true || false
 */
exports.matchPassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword)
}


/**
 * repository function to get token expiry date & time from jwt token
 * @param {*} token 
 * @returns {string} token expiry date & time
 */
exports.tokenExpiresAt = async (token) => {
    let decodedToken = jwt.decode(token, { complete: true })

    if (decodedToken && decodedToken.payload?.exp) {
        const expirationTimeInMilliseconds = decodedToken.payload?.exp * 1000
        return new Date(expirationTimeInMilliseconds)
      }
}