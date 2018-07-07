module.exports = function (app, db) {
  app.get('/posts/:id', (req, res) => {
    const id = req.params.id
    const details = { 'customId': id };
    db.collection('posts').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'})
      } else {
        const response = {
          statusCode: 200,
          headers:  { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: {item}
        }
        res.send(response)
      }
    })
  })

  app.post('/posts', (req, res) => {
    const post = { customId: req.body.id, title: req.body.title, upvotes: 0, views: 0}
    const id = req.body.id
    const details = { 'customId': id }

    db.collection('posts').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'})
      } else if (item) {
        const response = {
          statusCode: 200,
          headers:  { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: {item}
        }
        res.send(response)
      } else {
        db.collection('posts').insert(post, (err, result) => {
          if (err) { 
            res.send({ 'error': 'An error has occurred' })
          } else {
            res.send(result.ops[0])
          }
        })
      }
    })
  })

  app.patch('/posts/:id', (req, res) => {
    const id = { 'customId': req.params.id };
    const field = req.body.field
    switch(field) {
      case ("upvotes"):
        db.collection('posts').update(id, { $inc: { upvotes: 1 } })
        break
      case("views"):
        db.collection('posts').update(id, { $inc: { views: 1 } })
        break
    }
    const response = {
      statusCode: 200,
      headers:  { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
    res.send(response)
  })
}