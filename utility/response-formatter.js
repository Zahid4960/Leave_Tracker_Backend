/**
 * utility function to format responses
 * @param {*} res
 * @param {*} exception
 */
exports.responseFormatter = (res, exception) => {
    res.status(exception.statusCode).json(exception)
}