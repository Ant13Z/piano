const config = require('../config/user.config.js');
const express = require('express');
const indexController = require(config.getPath('backend/controller/index'));
const userController = require(config.getPath('backend/controller/user'));
const router = express.Router({ caseSensitive: true, strict: true });

//описываем сами роуты
router
    .get('/', indexController.index)
    .all('/user/', userController.index)
;

module.exports = router;
