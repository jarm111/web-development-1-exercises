var db = require('./dbconnection');

var studentQueries = {
    getAllStudents: function(callback) {
        db.query('SELECT * FROM opiskelijat', callback);
    }
};

module.exports = studentQueries;