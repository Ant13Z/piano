const config = require('../config/user.config.js');
const express = require('express');
const cors = require('cors');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require(config.getPath('backend/routing'));

const app = express();

//конфигурируем шаблонизатор, чтобы красиво
app.set('view engine', 'html');
app.set('views', config.getPath('frontend'));
app.engine('html', ejs.renderFile);
app.use(express.static(config.getPath('public')));

//конфигурируем и запускаем сервер
app.use(cors({
    origin: '*',
    methods: 'POST, GET, PUT, DELETE, OPTIONS',
    credentials: 'false',
    maxAge: 86400,
    allowedHeaders: [
        'X-Requested-With',
        'Content-Type',
        'Origin',
        'Authorization',
        'Accept',
        'Client-Security-Token',
        'Accept-Encoding'
    ]
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/', router);
//обработка серверных ошибок
app.use(function(err, req, res, next) {
    res.status(500);
    res.json({
        message: err.message,
        error: err
    });
});
app.listen(3000);
