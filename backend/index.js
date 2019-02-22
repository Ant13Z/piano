const config = require('../config/user.config.js');
const express = require('express');
const ejs = require('ejs');
const router = require(config.getPath('backend/routing'));

const app = express();

//конфигурируем шаблонизатор, чтобы "по красоте"
app.set('view engine', 'html');
app.set('views', config.getPath('frontend'));
app.engine('html', ejs.renderFile);

//конфигурируем и запускаем сервер
app.use(express.urlencoded({ extended: false }));
app.use(express.static(config.getPath('frontend/assets')));
app.use('/', router);
app.use(function(err, req, res, next) {
    res.status(500);
    res.json({
        message: err.message,
        error: err
    });
});
app.listen(3000);
