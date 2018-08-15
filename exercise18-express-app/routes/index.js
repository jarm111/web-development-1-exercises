var express = require('express');
var router = express.Router();

var sess;
var password = 'asdf';

/* Kun tullaan juureen tehdään nämä jutut */
router.get('/', function (req, res, next) {
    sess = req.session; //laitetaan sessio-olio muuttujaan sess

    if (sess.pass === password) {
        res.redirect('/upload'); //salainen sivu
    } else {
        res.render('index', {
            title: 'Express sessioesimerkki'
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
            title: 'Olet nyt sessiossa sivulla upload!',
            sessid: sess.id
        });
    }
    else {
        res.render('error', {// jos passu väärä, mennään error-sivulle
            message: 'Et ole kirjautunut tai salasanasi on väärä',
        });
    }
});

//reitti files-sivulle
router.get('/files', function (req, res) {
    sess = req.session; //laitetaan sessio-olio muuttujaan sess
    //tätä sivua ei ole suojattu salasanalla, mutta sessiossa ollaan silti
    res.render('files', {
        title: 'Olet nyt sessiossa sivulla files!',
        sessid: sess.id
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

module.exports = router;
