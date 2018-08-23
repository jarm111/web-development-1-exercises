var db = require('../dbconnection');

var User = {
    addUser: function(user, callback) {
        db.query('INSERT INTO user_jwt (name, email, password) VALUES(?, ?, ?)', [user.name, user.email, user.password], callback);
    },

    getUserById: function(id, callback) {
        db.query('SELECT * FROM user_jwt WHERE id=?', [id], callback);
    }
};

module.exports = User;