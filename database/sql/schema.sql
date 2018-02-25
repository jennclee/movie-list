CREATE DATABASE IF NOT EXISTS movieList;
USE movieList;

CREATE TABLE IF NOT EXISTS movies (
  title VARCHAR(30),
  summary TEXT,
  year DATE,
  runtime INT,
  rating FLOAT,
  watched BOOLEAN,
  poster TEXT
);