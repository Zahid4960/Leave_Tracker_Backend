exports.responseHandler= (res, response) => {
    res.status(response.statusCode).json(response)
}