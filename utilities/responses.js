class SuccessResponse {
    constructor(statusCode, message, data){
        this.statusCode = statusCode
        this.status = 'success'
        this.message = message
        this.data = data
    }
}

class ErrorResponse {
    constructor(statusCode, message){
        this.statusCode = statusCode
        this.status = 'error'
        this.message = message
    }
}

class ExceptionResponse {
    constructor(error){
        this.statusCode = error.statusCode || 500
        this.status = 'exception'
        this.message = error.message
        this.stack = error.stack
    }
}

class CustomException extends Error {
    constructor(statusCode, message){
        super(message)
        this.statusCode = statusCode
    }
}

module.exports = { 
    SuccessResponse, 
    ErrorResponse, 
    ExceptionResponse,
    CustomException
}
