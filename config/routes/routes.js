module.exports = (app) => {

  app.get('/', (req,res) => {
    res.redirect('/index');
  });

app.get('/index', (req, res) => {
  res.render('index')
});


}
