DROP DATABASE IF EXISTS moviesDB;
CREATE DATABASE IF NOT EXISTS moviesDB;
USE moviesDB;

DROP TABLE IF EXISTS movies;
CREATE TABLE IF NOT EXISTS movies (
  id INTEGER AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  summary TEXT,
  year DATE,
  runtime INTEGER,
  rating FLOAT,
  watched BOOLEAN,
  poster TEXT,
  PRIMARY KEY(id)
);