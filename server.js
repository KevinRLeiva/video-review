const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://Kevin:New@cluster0-lltht.mongodb.net/test?retryWrites=true";
const dbName = "data";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  //console.log(db)
  db.collection('video').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {video: result})
  })
})

app.put('/comments', (req, res) => {
  db.collection('video').findOneAndUpdate({title: req.body.title}, {
  $push: {
    comments: {
      "name": req.body.name,
      "title": req.body.title,
      "comment": req.body.comments
    }
  }
  }, {
  sort: {_id: -1},
  upsert: false
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
