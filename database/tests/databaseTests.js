/*
Run this file by going to a terminal window and typing 'node databaseTests.js'
*/

/*
Movie object: [title: string, summary: text, year: string, rating: float, runtime: integer, watched: boolean, image: string]
*/

const movieDB = require('../index');

let newMovie = ['Test Movie', 0];
let movies = [
  ['The Wizard of Oz', 'Magical movie about an innocent farm girl whisked out of her mundane earthbound existence into a land of pure imagination.', '1939-08-25', 101, 9.4, 0, 'https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg'],
  ['Citizen Kane', 'This is the labyrinthine study of the life of a newspaper tycoon.', '1941-05-01', 119, 9.4, 0, 'https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg'],
  ['E.T. the Extra-Terrestrial', 'A gentle alien lands on Earth and befriends a child.', '1982-06-11', 114, 9.2, 0, 'https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg'],
  ['The Godfather', 'Family affairs of the Mafia. Cannolis are involved.', '1972-03-24', 175, 9.2, 0, 'https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg']
];

movieDB.saveMulti(movies, (err) => {
  if (err) {
    console.log('Error inserting to DB');
  } else {
    console.log('Successfully inserted data into DB: ');
  }
});


movieDB.retrieve((err, movieDataFromDB) => {
  if (err) {
    console.log('Error selecting from DB');
  } else {
    console.log('Successfully retrieved data from DB: ', movieDataFromDB);
  }
});

movieDB.save(newMovie, (err) => {
  if (err) {
    console.log('Error inserting to DB');
  } else {
    console.log('Successfully inserted data into DB: ');
  }
});
