const {sequelize} = require('../models');

/**
 * Verify Sequelize Connection
 * @param app Express App
 * @returns {Promise<void>}
 */
module.exports = async function (app) {
    // Run Init Sequelize And Check Connection
    await sequelize.authenticate()
}