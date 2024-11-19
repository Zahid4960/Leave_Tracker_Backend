const jwt = require('jsonwebtoken')
const constantFile = require('../constant/constants')
const { errorResponse } = require('../helpers/response.helper')
const { findUserByEmail } = require('../repositories/authRepo')


/**
 * middleware function to verify auth token
 * @param {*} req 
 * @param {*} res 
 * @param {string} verifyFor
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
            const user = await findUserByEmail(decodedToken.email)

            if(user?.userType !== constantFile.ADMIN){
                return errorResponse(res, 401, 'You do not have authorization to access this api!')
            }
            
            next()
        }
    })
}


/**
 * middleware function to verify auth token for admin
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.verifyAdminToken = (req, res, next) => {
    verifyToken(req, res, next, constantFile.ADMIN)
}


/**
 * middleware function to verify auth token for user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.verifyUserToken = (req, res, next) => {
    verifyToken(req, res, next, constantFile.USER)
}
