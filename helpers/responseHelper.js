/**
 * helper function to handle success response
 * @param {*} res 
 * @param {*} statusCode 
 * @param {*} message 
 * @param {*} data 
 */
exports.sendsuccessResponse = (res, statusCode, message, data) => {
    res.status(statusCode).json({
        status: 'success',
        success: true,
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
exports.sendErrorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({
        status: 'error',
        success: false,
        message: message
    })
}


/**
 * helper function to handle custom exception response
 * @param {*} res 
 * @param {*} statusCode 
 * @param {*} exceptionMessage 
 */
exports.sendExceptionResponse = (res, err) => {
    res.status(500).json({
        status: 'exception',
        success: false,
        message: err.message,
        stack: err.stack
    })
}