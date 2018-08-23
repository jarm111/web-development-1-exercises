/*
 * Created with a help from an example found:
 * https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52 
 */

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../models/User');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var tokenExpireTime = 600; // 10 minutes

// Register new user
router.post('/register', function (req, res) {
    // encrypt password
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.addUser(
        {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        },
        function (err, user) {
            if (err) return res.status(500).send('There was a problem registering the user');
            
            // create a token, user.insertId is the auto-increment id
            // the jwt.sign() method takes a payload and the secret key defined in config.js as parameters.
            // It creates a unique string of characters representing the payload, this case the id of the user
            var token = jwt.sign({id: user.insertId}, config.secret, {
                expiresIn: tokenExpireTime
            });

            res.status(200).send({ auth: true, token: token });
        }
    );
});

// Get logged in user info
// expect the token be sent along with the request in the headers
router.get('/me', function (req, res) {
    // The default name for a token in the headers of an HTTP request is x-access-token
    var token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided' });
    }

    // decodes the token making it possible to view the original payload
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }

        // res.status(200).send(decoded);
        User.getUserById(decoded.id, function (err, user) {
            if (err) return res.status(500).send('There was a problem finding the user');
            if (!user) return res.status(404).send('No user found');
            // don't show password
            user[0].password = 0;
            // send back the user object
            res.status(200).send(user);
        });
    });
});

// Login user
router.post('/login', function(req, res) {
    User.getUserByEmail(req.body.email, function(err, user) {
        if (err) return res.status(500).send('Error on the server');
        if (!user[0]) return res.status(404).send('No user found');
        
        // compare the password sent with the request to the password in the database 
        var passwordIsValid = bcrypt.compareSync(req.body.password, user[0].password);
        if (!passwordIsValid) return res.status(401).send({auth: false, token: null});

        // sign a token
        var token = jwt.sign({id: user.insertId}, config.secret, {
            expiresIn: tokenExpireTime
        });

        res.status(200).send({auth: true, token: token});
    });
});

// logout user, usually done client side by destroying the token
router.get('/logout', function(req, res) {
    res.status(200).send({auth: false, token: null});
});

module.exports = router;