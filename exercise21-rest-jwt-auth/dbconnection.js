/**
 * Establish the database connection
 */

var mysql = require('mysql');

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'websk1'
});

module.exports = connection;