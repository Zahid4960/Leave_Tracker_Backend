const userModel = require('../models/userModel')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


/**
 * check if user exist or not by given email
 * @param {*} email 
 * @returns boolean
 */
exports.isUserExistOrNotByEmail = async (email) => {
    let user = await userModel.find({ email: email })

    return user.length > 0 ? true : false
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
exports.generateToken = async (email, secret) => {
    return await jwt.sign({ email: email}, secret)
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