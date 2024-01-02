var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function(req, res, next) {
  const playMode = new URLSearchParams(window.location.search).get("play");
  res.redirect('/api/play/'+IDFichero);
});

module.exports = router;
