const API_KEY = require('./api_key');
const path = require('path');
const axios = require('axios');

const BASE_PATH = 'https://api.themoviedb.org/3';

module.exports.initialLoad = () => {
  return new Promise((resolve, reject) => {
    axios.get('https://api.themoviedb.org/3/movie/now_playing', {
      params: {
        api_key: API_KEY.KEY
      }
    }).then((res) => {
      console.log('movieAPI res: ', res);
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
};
