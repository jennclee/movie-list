const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Promise = require('bluebird');
const movieAPI = require('../lib/movieAPI');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.listen(3000, function () { console.log('MovieList app listening on port 3000!') });

app.get('/load', (req, res) => {
  movieAPI.initialLoad().then((response) => {
    const movies = movieAPI.parseResponse(response);
    res.send(movies);
  }).catch((err) => {
    console.log(err);
  });
});

app.get('/movies', (req, res) => {
  // TODO: Update to get movies from API
  res.send(movies);
});

app.post('/movie', (req, res) => {
  // TODO: Add movie to database
  const newMovieObj = {
    title: req.body.newMovie,
    watched: false
  };
  movies.push(newMovieObj);
  res.status(200).send('POST successful!');
});
