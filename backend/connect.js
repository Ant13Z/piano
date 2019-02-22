const config = require('../config/user.config.js');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(config.getPath('backend/db.sqlite3'));

module.exports = db;
