var express = require('express');
var mongojs = require('mongojs');
var router = express.Router();
var session = require('express-session');
const dirdb = 'mongodb://127.0.0.1:27017/grabadoraAudio';
//const db = mongojs('mongodb://127.0.0.1:27017/test', ['tareas'])
var db = mongojs(dirdb, ['users']);

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
  var usuario = db.users.findOne({username:req.body.name,password:req.body.pass},
  function(err,doc){
  if(err) {
  console.log(err + 'err');
  return;
  } else {if(doc){
  console.log(doc.username + ' ' + doc.password)
  //console.log('usuario existente')
  req.session.name = req.body.name;
  res.send(JSON.stringify({ name: doc.username}));}else{res.send(JSON.stringify({ name: 'Usuario desconocido'}))}}})
  //if(usuario){console.log("assaddddddddddddddddddd");}else console.log("saaaaaaaaaaaaaaaaaaaaaaad");

  //console.log("asdasdasd");

 // }
 //res.write('Usuario no existente');
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
