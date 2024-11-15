/**
 * utility class for success response
 */
class SuccessResponse {
    constructor(statusCode, status, message, data){
        this.statusCode = statusCode
        this.status = 'success'
        this.message = message
        this.data = data
    }
}


/**
 * utility class for error response
 */
class ErrorResponse extends SuccessResponse {
    constructor(statusCode, message){
        super(statusCode, message)
        this.status = 'error'
        this.message = message
    }
}


/**
 * utility class for exception response
 */
class ExceptionResponse {
    constructor(error){
        this.statusCode = error.statusCode || 500
        this.status = 'exception'
        this.message = error.message
        this.stack = error.stack
    }
}

module.exports = { SuccessResponse, ErrorResponse, ExceptionResponse }
