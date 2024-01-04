var express = require('express');
var router = express.Router();
var session = require('express-session');

const sess = {
  secret: 'clave secreta',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600000,
  }
}

router.use(session(sess));

router.post('/login',(req,res) => {
  req.session.name = req.body.name;
  res.end('done');
});

router.get('/main', function(req, res, next){
  res.render("main");
});

router.get('/', function(req, res, next) {
  if(req.session.name) {
    return res.redirect('/main');
  }
  res.render('login');
});

module.exports = router;
