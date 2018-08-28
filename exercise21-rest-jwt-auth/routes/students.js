/*
 * REST API routes for student
 */

var express = require('express');
var router = express.Router();
var Student = require('../models/Student');
var VerifyToken = require('../middleware/VerifyToken');

router.get('/', function(req, res, next) {
    Student.getAllStudents(function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/under100', function(req, res, next) {
    Student.getStudentsUnder100Credits(function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/:id', function(req, res, next) {
    Student.getStudentById(req.params.id, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.post('/', VerifyToken, function(req, res, next) {
    Student.addStudent(req.body, function(err) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.delete('/:id', VerifyToken, function(req, res, next) {
    Student.deleteStudent(req.params.id, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.put('/:id', VerifyToken, function(req, res, next) {
    Student.updateStudent(req.params.id, req.body, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;