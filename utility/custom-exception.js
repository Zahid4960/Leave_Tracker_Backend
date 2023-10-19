/**
 * utility class for throwing custom exception with status code & message
 */
class CustomException extends Error {
    constructor(statusCode, message){
        super(message)
        this.statusCode = statusCode
    }
}

module.exports = CustomException