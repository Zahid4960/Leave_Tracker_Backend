const userModel = require('../models/user.model')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


/**
 * function to check if user exist or not by given email
 * @param {*} email 
 * @returns boolean
 */
exports.isUserExistOrNotByEmail = async (email) => {
    let user = await userModel.findOne({ email: email })

    return user !== null ? true : false
}


/**
 * function to find user by email
 * @param {*} email 
 * @returns user
 */
exports.findUserByEmail = async (email) => {
    return await userModel.findOne({ email: email })
}


/**
 * function to create hashed/encrypted password
 * @param {*} plainPassword 
 * @param {*} salt 
 * @returns hashed/encrypted password
 */
exports.generateHashedPasword = async (plainPassword, salt) => {
    return await bcrypt.hash(plainPassword, parseInt(salt))
}


/**
 * function to generate jwt token
 * @param {*} email 
 * @param {*} secret 
 * @returns jwt token
 */
exports.generateToken = async (email, secret, isRemember = false) => {
    return await jwt.sign(
        { email: email}, 
        secret, 
        isRemember === true ? { expiresIn: '24h'} : { expiresIn: '1h'}
    )
}


/**
 * function to match user inputted password & hashed/encrypted password
 * @param {*} plainPassword 
 * @param {*} hashedPassword 
 * @returns boolean
 */
exports.matchPassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword)
}


/**
 * function to get token expiryy date & time from jwt token
 * @param {*} token 
 * @returns token expiry date & time
 */
exports.tokenExpiresAt = async (token) => {
    let decodedToken = jwt.decode(token, { complete: true })

    if (decodedToken && decodedToken.payload?.exp) {
        const expirationTimeInMilliseconds =decodedToken.payload?.exp * 1000
        return new Date(expirationTimeInMilliseconds)
      }
}