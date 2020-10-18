const express = require('express');
const config = require('./config');
const usersService = require('./services/UsersV1Service');

/**
 * Setup And Start Express Server
 * All other will be part of loaders
 * @returns {Promise<void>}
 */
async function startServer() {
    const app = express();
    // Load all dependencies & connections
    try {
        await require('./loaders')({app});
    } catch (error) {
        console.error(error);
        process.exit(1);
    }

    // Start HTTP server
    app.listen(config.port, () => {
        console.info(`Server listening on port: ${config.port}`);
    }).on('error', err => {
        console.error(err);
        process.exit(1);
    });
}

startServer();

