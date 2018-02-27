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
    const movieList = movieAPI.parseResponse(response);
    db.saveMulti(movieList).then(() => {
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
  const searchTerm = req.query.term;
  db.search(searchTerm).then(response => res.status(200).send(response));
});

app.post('/movie', (req, res) => {
  const newMovieObj = [
    req.body.newMovie,
    0
  ];
  console.log('Posting movie: ', newMovieObj);
  db.save(newMovieObj)
    .then(() => res.status(200).send('Saved movie!'))
    .catch((err) => {
      res.status(500).send('Error saving movie');
      console.log(err);
    });
});
