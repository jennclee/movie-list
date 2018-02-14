const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.listen(3000, function () { console.log('MovieList app listening on port 3000!') });

const movies = [
  { title: 'Mean Girls', watched: false },
  { title: 'Hackers', watched: false },
  { title: 'The Grey', watched: false },
  { title: 'Sunshine', watched: false },
  { title: 'Ex Machina', watched: false },
];

app.get('/movies', (req, res) => {
  res.send(movies);
});

app.post('/movie', (req, res) => {
  const newMovieObj = {
    title: req.body.newMovie,
    watched: false
  };
  movies.push(newMovieObj);
  res.status(200).send('POST successful!');
});
