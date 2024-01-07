const dirdb = 'mongodb://127.0.0.1:27017/grabadoraAudio';
var express = require('express');
var mongojs = require('mongojs');
var db = mongojs(dirdb, ['recordings']);
var multer = require('multer');
var router = express.Router();
var fs = require('fs');
const path = require('path');
/*
const handleList = async (name) => {
  db.recordings.find({ name: name }, (err, doc) => {
    if (!err) {if(doc){
                var json=JSON.parse('{"name":"asdc"}');
                console.log(json);
                console.log(JSON.stringify(doc));
                console.log(doc.sort(r => -r.date).slice(0, 5));
                console.log('');
                var jsonr =JSON.stringify({data:doc.sort(r => -r.date).slice(0, 5)});
                console.log(jsonr);
                return JSON.stringify({data:doc.sort(r => -r.date).slice(0, 5)});
               };
    }
  });
};
*/
const handleList = async (name) => {
  return new Promise((resolve, reject) => {
    db.recordings.find({ name: name }, (err, doc) => {
      if (err) {
        reject(err);
      } else {
        if (doc) {
          var sortedData = doc.sort((r1, r2) => r2.date - r1.date).slice(0, 5);
          var jsonData = { data: sortedData };
          console.log(jsonData);
          resolve(jsonData);
        } else {
          resolve({ data: [] });
        }
      }
    });
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './recordings')
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2500000,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'audio/ogg') {
      return cb(null, false, new Error('Wrong format.'));
    }
    cb(null, true);
  }
}).single("recordings");

router.get('/', function (req, res, next) {
  const playMode = new URLSearchParams(window.location.search).get("play");
  res.redirect('/api/play/' + IDFichero);
});

/*
router.get('/list/:name', function (req, res, next) {
  handleList(req.params.name)
    .then(r=>{console.log('rapido');r.json()})
    .then(r => {res.send(r)});
});
*/

router.get('/list/:name', async function (req, res, next) {
  try {
    const result = await handleList(req.params.name);
    console.log('rapido', result.data);
    res.send(result.data);
  } catch (error) {
    // Handle errors here
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/logout', function (req, res, next) {
  res.send('');
});

router.post("/upload/:name", (req, res, next) => {
  upload(req, res, async (err) => {
    if (!err) {
      db.recordings.insert({
        name: req.params.name,
        filename: req.file.filename,
        date: Date.now(),
        accessed: Date.now()
      });
      handleList(req.params.name)
        .then(r => res.send((r)));
    } else { console.log(err) }
  })
});

router.post("/delete/:name/:filename", async (req, res, next) => {
  console.log('name:' + req.params.name);
  console.log('filename:' + req.params.filename);
  db.recordings.remove({ filename: req.params.filename, name: req.params.name });
  var filepath = `./recordings/${req.params.filename}`;
  fs.unlink(filepath, (err => {
    if (err) console.log(err);
    else {
      console.log("Deleted file from recordings");
    }
  }));
  handleList(req.params.userId)
    .then(r => res.send(JSON.stringify(r)));
});

router.get("/play/:filename", (req, res, next) => {
  console.log(req.params.filename);
  var filepath = `./recordings/${req.params.filename}`;
  console.log(filepath);
  fs.exists(filepath, (exists) => {
    if (exists) {
      console.log('Existe');
      db.recordings.updateOne(
        { filename: req.params.filename },
        { $set: { accessed: Date.now() } }
      );
      res.sendFile(path.resolve(filepath));
    } else {
      console.log('No existe');
      /*res.status(404).render('error');*/
    }
  });
});
function cleanup() {
  let tsNow = Date.now();
  db.recordings.find({}, (err, doc) => {
    if (err) {
      res.send(err);
    } else {
      let idCaducados = doc.filter(r => tsNow - r.date > 432000).map(r => r.filename);
      db.recordings.remove({ filename: { $in: idCaducados } });
      idCaducados.forEach(fileaborr => {
        var filepath = `./recordings/${fileaborr}`;
        fs.unlink(filepath, err => {
          if (err) console.log(err);
          else {
            console.log("Deleted file from recordings");
          }
        });
      });
    }
  });
};


module.exports.router = router;
module.exports.cleanup = cleanup;
