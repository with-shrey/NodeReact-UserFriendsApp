const createError = require('http-errors');
const httpStatus = require('http-status');

/**
 * Handle 404 & return JSON Response
 * @param req
 * @param res
 * @param next
 */
module.exports = function (req, res, next) {
    const err = createError(httpStatus.NOT_FOUND, 'No Resource matching this URL');
    next(err);
}