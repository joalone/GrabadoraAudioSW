var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var PORT = process.env.PORT || 3030;

var indexRouter = require('./routes/index');
var api = require('./routes/api');

var app = express();

const sess = {
  secret: 'Con esta frase se generan identificadores de sesión cifrados',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 2000,
  }
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session(sess));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

app.use('/', indexRouter);
app.use('/api', api.router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

setInterval(api.cleanup, 3600);

module.exports = app;
