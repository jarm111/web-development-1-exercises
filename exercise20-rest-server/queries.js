/*
 * Application methods for database queries
 */

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
    },

    addStudent: function(student, callback) {
        db.query('INSERT INTO opiskelijat (snimi, enimi, onumero, opisteet) VALUES(?, ?, ?, ?)', [student.surname, student.forename, student.studentnumber, student.credits], callback);
    },

    deleteStudent: function(id, callback) {
        db.query('DELETE FROM opiskelijat WHERE id=?', [id], callback);
    },

    updateStudent: function(id, student, callback) {
        db.query('UPDATE opiskelijat SET snimi=?, enimi=?, onumero=?, opisteet=? WHERE id=?', [student.surname, student.forename, student.studentnumber, student.credits, id], callback);
    }
};

module.exports = studentQueries;