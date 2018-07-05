const ObjectID = require('mongodb').ObjectID

module.exports = function (app, db) {
  app.get('/posts/:id', (req, res) => {
    const id = req.params.id
    const details = { 'title': new ObjectID(id) };
    db.collection('posts').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    })
  })

  app.post('/posts', (req, res) => {
    console.log(req.body)
    const post = { title: req.body.title, upvotes: 0, views: 0}
    db.collection('posts').insert(post, (err, result) => {
      if (err) { 
        console.log(err)
        res.send({ 'error': 'An error has occurred' })
      } else {
        res.send(result.ops[0])
      }
    })
  })
}