const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const db = require('./config/db.js')

const app = express()

const port = 3030;

app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
                      
  const db = database.db("the-new-coder")

  require('./app/routes')(app, db)
  app.listen((process.env.PORT || port), () => {
    console.log('We are live on ' + port)
  })
})