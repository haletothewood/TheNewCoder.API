const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const db = require('./config/db.js')
const cors = require('cors')

const app = express()
app.use(cors())

const port = 3030;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (_, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://thenewcoder.netlify.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
                      
  const db = database.db("the-new-coder")

  require('./app/routes')(app, db)
  app.listen((process.env.PORT || port), () => {
    console.log('We are live on ' + port)
  })
})
