var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*Session käyttöönotto
  Sessio toimii siten että luotaessa sessio syntyy selaimelle automaattisesti cookie jonka
  nimi on connect.sid (sessionid). Se ylläpitää yhteyttä palvelimella olevaan sessioon
  sen sisältämän sessioid:n avulla.
  Itse sessio sisältää sessiomuuttujia, joita voidaan lukea siirryttäessä sivulta toiselle.
  Jos sessiomuuttujana on vaikka salasana, niin sivuille siirryttäessä voidaan tutkia onko
  salasana oikea ja jos on, päästetään käyttäjä sivulle.
*/
app.use(session({ secret: 'salausarvo', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }));
app.use(fileUpload());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
    next();
});

module.exports = app;