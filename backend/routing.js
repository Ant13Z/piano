const config = require('../config/user.config.js');
const express = require('express');
const IndexController = require(config.getPath('backend/controller/index'));
const UserController = require(config.getPath('backend/controller/user'));
const router = express.Router({ caseSensitive: true, strict: true });

//описываем сами роуты
router
    .all('/api/user/', UserController.index)
    .get('/api/user/auth/', UserController.auth)
    .post('/api/user/auth/', UserController.auth)
    .get(/.*$/, IndexController.index)
;

module.exports = router;
