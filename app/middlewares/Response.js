function Response(req, res, next) {
    res.Response = function ({data = null, statusCode = res.statusCode, message = 'ok'}) {
        res.status(statusCode).json({
            statusCode: res.statusCode,
            message: res.message || message,
            data: data
        });
    };

    next();
}

module.exports = Response;
