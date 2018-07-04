module.exports = function (app, db) {
  app.post('/posts', (req, res) => {
    // Post creation here
    res.send('Hello World, from the post route.')
  })
}