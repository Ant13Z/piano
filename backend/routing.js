const express = require('express');
const indexController = require('./controller/index');
const userController = require('./controller/user');
const router = express.Router({ caseSensitive: true, strict: true });

//описываем сами роуты
router
    .get('/', indexController.index)
    .get('/user/', userController.index)
;

module.exports = router;
