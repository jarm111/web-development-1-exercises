var db = require('../dbconnection');

var User = {
    addUser: function(user, callback) {
        db.query('INSERT INTO user_jwt (name, email, password) VALUES(?, ?, ?)', [user.name, user.email, user.password], callback);
    }
};

module.exports = User;