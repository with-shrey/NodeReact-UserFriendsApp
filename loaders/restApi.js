const bodyParser = require('body-parser');
const config = require('../config');
const restApiRoot = require('../api');
const routeNotFound = require('../middlewares/routeNotFound');
const errorHandler = require('../middlewares/errorHandler');
const {errors} = require('celebrate');

/**
 * Initialize Express App & Mount RestAPIs
 * @param app Express App
 * @returns {Promise<void>}
 */
module.exports = async function (app) {
    app.use(bodyParser.json());
    // Mount Rest Root
    app.use(config.apiBase, restApiRoot)
    // 404 Handler
    app.use(routeNotFound);
    // Celebrate Validation errors handler
    app.use(errors());
    // Global Errors Handler
    app.use(errorHandler);

}