const API_KEY = require('./api_key');
const axios = require('axios');

module.exports.initialLoad = () => {
  return new Promise((resolve, reject) => {
    axios.get('https://api.themoviedb.org/3/movie/now_playing', {
      params: {
        api_key: API_KEY.KEY
      }
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
};

module.exports.parseResponse = (movieResponse) => {
  return movieList = movieResponse.data.results.map(movie => {
    return [
      movie.title,
      movie.overview,
      movie.release_date,
      movie.runtime,
      movie.vote_average,
      0,
      `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    ]
  });
};
