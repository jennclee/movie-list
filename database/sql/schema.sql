CREATE DATABASE IF NOT EXISTS moviesDB;
USE moviesDB;

CREATE TABLE IF NOT EXISTS movies (
  title VARCHAR(30),
  summary TEXT,
  year DATE,
  runtime INT,
  rating FLOAT,
  watched BOOLEAN,
  poster TEXT
);