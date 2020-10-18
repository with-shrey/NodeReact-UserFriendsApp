const dotenv = require('dotenv');

const envFound = dotenv.config();
// Stop if .env is missing
if (envFound.error) {
    throw new Error("Couldn't find .env file");
}

/**
 *
 * Export env variables & Set defaults
 */
module.exports = {
    port: process.env.PORT || 3001,
    apiBase: process.env.API_BASE || '/api',
};