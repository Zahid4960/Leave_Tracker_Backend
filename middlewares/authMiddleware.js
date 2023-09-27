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
const verifyToken = (req, res, next, verifyFor) => {
    const token = req.headers.authorization

    if(!token){
        return errorResponse(res, 401, 'No token provided!')
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if(err){
            return errorResponse(res, 403, 'Invalid token provided or token expired!')
        }

        if(decodedToken?.email && verifyFor === constantFile.ADMIN){
            console.log(decodedToken)
            const user = await findUserByEmail(decodedToken.email)
            console.log(user)
            if(user?.userType === constantFile.ADMIN){
                console.log('check')
                return errorResponse(res, 401, 'You do not have authorization to access this api!')
            }
        }
    })
    next();
}


/**
 * middleware to verify auth token for admin
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.verifyAdminToken = (req, res, next) => {
    verifyToken(req, res, next, constantFile.ADMIN)
}


/**
 * middleware to verify auth token for user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.verifyUserToken = (req, res, next) => {
    verifyToken(req, res, next, constantFile.USER)
}
