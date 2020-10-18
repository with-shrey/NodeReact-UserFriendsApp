const createError = require('http-errors');
const httpStatus = require('http-status');

/**
 * Express Error Handler
 * @param err
 * @param req
 * @param res
 * @param next
 */
module.exports = function (err, req, res, next) {
    if (err.status) {
        res.status(err.status).send(err);
    } else {
        console.error(err);
        res.send(createError(httpStatus.INTERNAL_SERVER_ERROR))
    }
}