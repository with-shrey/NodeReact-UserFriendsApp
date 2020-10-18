/**
 * Routes Between different versions of API
 */
const express = require('express');
const V1Router = require('./v1');

const router = express.Router();

router.use('/v1', V1Router)

module.exports = router