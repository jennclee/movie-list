const mysql = require('mysql');
const Promise = require('bluebird');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'moviesDB'
});

db.connect((err) => {
  if (err) return console.log('Error connecting');
  console.log('Connection successful');
});

module.exports.save = (movie) => {
  const sql = `REPLACE INTO movies (title, watched) VALUES ('${movie.title}', '${movie.watched}')`;

  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        console.log('results: ', results);
        Promise.resolve(db.query(`SELECT * FROM movies WHERE id = ${results.insertId}`));
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
  const sql = `SELECT * FROM movies WHERE title CONTAINS ${term}`;
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
