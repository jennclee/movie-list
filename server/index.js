const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const movieAPI = require('../lib/movieAPI');
const db = require('../database/index');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.listen(3000, function () { console.log('MovieList app listening on port 3000!') });

app.get('/load', (req, res) => {
  movieAPI.initialLoad().then((response) => {
    db.saveMulti(response).then(() => {
      db.retrieve().then(data => res.status(200).send(data)).catch(err => console.log(err));
    });
  }).catch((err) => {
    console.log(err);
  });
});

app.get('/movies', (req, res) => {
  db.retrieve().then(response => res.status(200).send(response)).catch(err => console.log(err));
});

app.get('/search', (req, res) => {

});

app.post('/movie', (req, res) => {
  // TODO: Add movie to database
  let addMovies = [];
  const newMovieObj = {
    title: req.body.newMovie,
    watched: false
  };
  addMovies.push(newMovieObj);
  res.status(200).send(addMovies);
});
