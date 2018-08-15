var express = require('express');
var router = express.Router();

var sess;

/* Kun tullaan juureen tehdään nämä jutut */
router.get('/', function (req, res, next) {
    sess = req.session; //laitetaan sessio-olio muuttujaan sess

    if (sess.pass === 'qwerty') {
        res.redirect('/salasivu1'); //salainen sivu
    } else {
        res.render('index', {
            title: 'Express sessioesimerkki'
        }); //kirjautumissivu
    }
});

//reitti salasivu1-sivulle
router.get('/salasivu1', function (req, res) {
    sess = req.session; //laitetaan sessio-olio muuttujaan sess
    //sivu on suojattu salasanalla. Sen voisi hakea ulkoisesta tiedostosta tai kannasta
    if (sess.pass === 'qwerty') {
        res.render('salasivu1', {
            title: 'Olet nyt sessiossa sivulla salasivu1!',
            sessid: sess.id
        });
    }
    else {
        res.render('error', {// jos passu väärä, mennään error-sivulle
            message: 'Et ole kirjautunut tai salasanasi on väärä',
        });
    }
});

//reitti salasivu2-sivulle
router.get('/salasivu2', function (req, res) {
    sess = req.session; //laitetaan sessio-olio muuttujaan sess
    //tätä sivua ei ole suojattu salasanalla, mutta sessiossa ollaan silti
    res.render('salasivu2', {
        title: 'Olet nyt sessiossa sivulla salasivu2!',
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
