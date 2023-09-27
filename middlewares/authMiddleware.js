const jwt = require('jsonwebtoken')
const constantFile = require('../config/constants')
const { errorResponse } = require('../helpers/responseHelper')
const { findUserByEmail } = require('../repositories/authRepo')


/**
 * function to verify auth token
 * @param {*} req 
 * @param {*} res 
 * @param {*} verifyFor 
 */
const verifyToken = async (req, res, verifyFor) => {
    const token = req.headers.authorization

    if(!token){
        errorResponse(res, 401, 'No token provided!')
    }

    await jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if(err){
            return errorResponse(res, 403, 'Invalid token provided!')
        }

        if(decodedToken.exp <= Date.now() / 1000){
            return errorResponse(res, 401, 'Token expired!')
        }

        if(decodedToken.email && verifyFor === constantFile.ADMIN){
            const user = await findUserByEmail(decodedToken.email)
        
            if(user.userType !== constantFile.ADMIN){
                return errorResponse(res, 401, 'You do not have authorization to access this api!')
            }
        }
    })
}


/**
 * function to verify auth token for admin
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.verifyAdminToken = async (req, res, next) => {
    const decodedToken = await verifyToken(req, res, constantFile.ADMIN)
    next()
}


/**
 * function to verify auth token for user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.verifyUserToken = async (req, res, next) => {
    await verifyToken(req, res, constantFile.USER)
    next()
}
