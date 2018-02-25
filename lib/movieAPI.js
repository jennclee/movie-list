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
  const movieList = [];
  movieResponse.data.results.forEach((movie) => {
    const movieObj = {
      title: movie.title,
      summary: movie.overview,
      year: movie.release_date,
      runtime: movie.runtime,
      rating: movie.vote_average,
      image: movie.poster_path,
      watched: false
    };
    movieList.push(movieObj);
  });
  return movieList;
};
