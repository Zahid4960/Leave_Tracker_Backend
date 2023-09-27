/**
 * helper function to handle success response
 * @param {*} res 
 * @param {*} statusCode 
 * @param {*} message 
 * @param {*} data 
 */
exports.successResponse = (res, statusCode, message, data) => {
    res.status(statusCode).json({
        status: 'success',
        message: message,
        data: data
    })
}


/**
 * helper function to handle error response
 * @param {*} res 
 * @param {*} statusCode 
 * @param {*} message 
 */
exports.errorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({
        status: 'error',
        message: message
    })
}


/**
 * helper function to handle custom exception response
 * @param {*} res 
 * @param {*} statusCode 
 * @param {*} exceptionMessage 
 */
exports.exceptionResponse = (res, err) => {
    res.status(500).json({
        status: 'exception',
        message: err.message,
        stack: err.stack
    })
}