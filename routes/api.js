const dirdb = 'mongodb://127.0.0.1:27017/grabadoraAudio';
var express = require('express');
var mongojs = require('mongojs');
var db = mongojs(dirdb, ['recordings']);
var multer = require('multer');
var router = express.Router();

const handleList = async (name) => {
  db.recordings.find({ name: name }, (err, doc) => {
    if (!err) {
      return doc.sort(r => -r.date).slice(0, 5);
    }
  });
};

const upload = multer({
  dest: './recordings/',
  limits: {
    fileSize: 2500000,
  },
  /*
  fileFilter: (req, file, cb)  => {
    if (file.mimetype != 'audio/ogg') {
      return cb(new Error('Wrong format.'));
    }
    cb(error, true);
  }
  */
}).single("recording"); 

router.get('/list/:name', function (req, res, next) {
  handleList(req.params.name)
    .then(r => res.send(JSON.stringify(r)));
});

router.post("/upload/:name", upload, (req, res, next) => {
  upload(req, res, async (err) => {
    if(!err) {
      db.recordings.insert({ 
        name: req.params.name, 
        filename: req.file.filename,
        date: Date.now(), 
        accessed: Date.now()
      });
      handleList(req.params.userId)
    .then(r => res.send(JSON.stringify(r)));
    }
  })
});

router.post("/delete/:name/:filename", async (req, res, next) => {
  db.recordings.remove({ filename: req.params.filename, name: req.params.name });
  handleList(req.params.userId)
    .then(r => res.send(JSON.stringify(r)));
});

router.get("/play/:filename", (req, res, next) => {
  var filepath = `req.params.filename${req.params.filename}`;
  if(fs.exists(filepath)){
    db.recordings.updateOne(
      { filename: req.params.filename }, 
      { $set: { accessed: Date.now() } }
      );
    res.sendFile(`./recordings/${filename}`);
  }else{
    res.status(404).render('error');
  }
});

function cleanup() {
  let tsNow = Date.now();
  db.recordings.find({},(err,doc) => {
    if (err) {
        res.send(err);
    } else {
      let idCaducados = doc.filter(r => tsNow - r.date > 432000).map(r => r.filename);
      db.recordings.remove({filename: { $in: idCaducados } });
    }
});
}

module.exports.router = router;
module.exports.cleanup = cleanup;
