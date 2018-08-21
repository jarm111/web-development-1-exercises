var db = require('./dbconnection');

var studentQueries = {
    getAllStudents: function(callback) {
        db.query('SELECT * FROM opiskelijat', callback);
    },

    getStudentById: function(id, callback) {
        db.query('SELECT * FROM opiskelijat WHERE id=?', [id], callback);
    },

    getStudentsUnder100Credits: function(callback) {
        db.query('SELECT * FROM opiskelijat WHERE opisteet<100', callback);
    }
};

module.exports = studentQueries;