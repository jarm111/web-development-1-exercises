var express = require('express');
var router = express.Router();
var fs = require('fs');

var sess;
var password = 'asdf';

/* Kun tullaan juureen tehdään nämä jutut */
router.get('/', function (req, res, next) {
    sess = req.session; //laitetaan sessio-olio muuttujaan sess

    if (sess.pass === password) {
        res.redirect('/upload'); //salainen sivu
    } else {
        res.render('index', {
            title: 'Exercise 18 - Express File Upload/Download Site',
            password: password
        }); //kirjautumissivu
    }
    next();
});

//reitti upload-sivulle
router.get('/upload', function (req, res) {
    sess = req.session; //laitetaan sessio-olio muuttujaan sess
    //sivu on suojattu salasanalla. Sen voisi hakea ulkoisesta tiedostosta tai kannasta
    if (sess.pass === password) {
        res.render('upload', {
            title: 'Session page: Upload!',
            sessid: sess.id
        });
    }
    else {
        res.render('error', {// jos passu väärä, mennään error-sivulle
            message: 'You have not logged in or the password is incorrect.',
            error: 500,
        });
    }
});

//reitti files-sivulle
router.get('/files', function (req, res) {
    sess = req.session; //laitetaan sessio-olio muuttujaan sess
    //tätä sivua ei ole suojattu salasanalla, mutta sessiossa ollaan silti
    var files = fs.readdirSync('uploads/');
    console.log(files);
    res.render('files', {
        title: 'Session page: Files Download!',
        sessid: sess.id,
        files: files,
        filePath: '../uploads/'
    }); //salainen sivu
});

router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');//takaisin juureen eli kirjautumaan
        }
    });
});

/*
login -reitti on post-tyyppinen eli se vastaanottaa
post-metodilla lähetettyä dataa
*/
router.post('/login', function (req, res) {
    sess = req.session;
    sess.email = req.body.email; //sess.email saa arvon login-sivulta (index.ejs)
    sess.pass = req.body.pass;////sess.pass saa arvon login-sivulta (index.ejs)
    res.end('done'); //response eli vastaus on 'done' ja se saadaan login-sivulle
});

router.post('/uploadfile', function (req, res) {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    var sampleFile = req.files.sampleFile;
    var fileName = req.files.sampleFile.name;
    var uploadPath = './uploads/' + fileName;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/files');
        // res.send('File uploaded!');
    });
});

module.exports = router;
