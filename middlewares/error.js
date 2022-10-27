const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message; undefined

    console.log(err.stack)

    res
    .status(error.statusCode || 500)
    .setHeader('Content-Type', 'application/json')
    .json({
        sucess: false,
        error: error.message || 'Server Error'
    })
}

module.exports = errorHandler;