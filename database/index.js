const mysql = require('mysql');
const Promise = require('bluebird');
const movieAPI = require('../lib/movieAPI');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'moviesDB'
});

db.connect((err) => {
  if (err) return console.log('Error connecting: ', err);
  console.log('Connection successful');
});

module.exports.save = (movie) => {
  const sql = 'INSERT IGNORE INTO movies (title, watched) VALUES (?)';
  return new Promise((resolve, reject) => {
    db.query(sql, [movie], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports.saveMulti = (movies) => {
  const movieList = movieAPI.parseResponse(movies);
  const sql = 'INSERT IGNORE INTO movies (title, summary, year, runtime, rating, watched, poster) VALUES ?';
  return new Promise((resolve, reject) => {
    db.query(sql, [movieList], (err, results) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports.retrieve = () => {
  const sql = 'SELECT * FROM movies LIMIT 10';
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports.search = (term) => {
  const sql = 'SELECT * FROM movies WHERE UPPER(title) LIKE UPPER(?)';
  return new Promise((resolve, reject) => {
    db.query(sql, `%${term}%`, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
