const cors = require('cors');

/**
 * Enable CORS
 * @param app Express App
 * @returns {Promise<void>}
 */
module.exports = async function (app) {
    app.use(cors());
}