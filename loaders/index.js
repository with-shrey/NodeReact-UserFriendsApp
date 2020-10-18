const restApiLoader = require('./restApi');
const corsLoader = require('./cors');
const sequelizeLoader = require('./sequelize');

/**
 * Import & Call All Loaders
 * @param app - Express App
 * @returns {Promise<void>}
 */
module.exports = async function loaders({app}) {
    await sequelizeLoader(app)
    await corsLoader(app)
    await restApiLoader(app);
}