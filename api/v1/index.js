/**
 * All Routes for V1 API
 */
const express = require('express');
const usersRoutes = require('./usersV1Route');

const router = express.Router();

router.use('/users', usersRoutes)

module.exports = router