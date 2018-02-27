import React from 'react';
import ReactDOM from 'react-dom';
import Movie from './components/Movie';
import Search from './components/Search';
import AddMovie from './components/AddMovie';

const axios = require('axios');

class MovieList extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      originalMovies: [],
    };
    this.handleOnSearch = this.handleOnSearch.bind(this);
    this.handleClearSearch = this.handleClearSearch.bind(this);
    this.handleOnAdd = this.handleOnAdd.bind(this);
    this.handleOnWatched = this.handleOnWatched.bind(this);
    this.handleFilterWatched = this.handleFilterWatched.bind(this);
    this.handleFilterUnwatched = this.handleFilterUnwatched.bind(this);
    this.handleShowAll = this.handleShowAll.bind(this);
  }

  componentWillMount() {
    axios.get('/load').then((res) => {
      console.log('app res: ', res);
      this.setState({
        movies: res.data
      });
    });
  }

  handleClearSearch() {
    if (this.state.movies.length < this.state.originalMovies.length) {
      this.setState({
        movies: this.state.originalMovies
      });
    } else if (this.state.movies.length > this.state.originalMovies.length) {
      this.setState({
        originalMovies: this.state.movies
      });
    }
  }

  handleOnSearch(text) {
    this.handleClearSearch();
    let searchResults;
    axios.get(`/search?term=${text}`)
      .then((response) => {
        searchResults = response.data;
        if (searchResults.length === 0) {
          searchResults = [
            { title: 'There are no movies on your list with this title. Please try another search term!' }
          ];
        }
        this.setState({
          movies: searchResults
        });
      }).catch(error => console.log(error));
  }

  handleOnAdd(movie) {
    axios.post('/movie', {
      newMovie: movie
    })
    .catch(error => console.log(error));
  }

  handleOnWatched(movie) {
    const updatedMovies = this.state.movies;
    updatedMovies.forEach((updatedMovie) => {
      if (updatedMovie.title === movie.title) {
        updatedMovie.watched = !updatedMovie.watched;
      }
    });
  }

  handleShowAll() {
    if (this.state.originalMovies.length > this.state.movies.length) {
      this.setState({
        movies: this.state.originalMovies
      });
    }
  }

  handleFilterWatched() {
    const watchedMovies = this.state.originalMovies.filter((movie) => {
      return movie.watched === true;
    });
    if (this.state.originalMovies.length < this.state.movies.length) {
      this.setState({
        originalMovies: this.state.movies,
        movies: watchedMovies
      });
    } else {
      this.setState({
        movies: watchedMovies
      });
    }
  }

  handleFilterUnwatched() {
    const unwatchedMovies = this.state.originalMovies.filter((movie) => {
      return movie.watched === false;
    });
    if (this.state.originalMovies.length < this.state.movies.length) {
      this.setState({
        originalMovies: this.state.movies,
        movies: unwatchedMovies
      });
    } else {
      this.setState({
        movies: unwatchedMovies
      });
    }
  }

  render() {
    return (
      <div>
        <div className="navbar">
          <Search search={this.handleOnSearch} clear={this.handleClearSearch} />
          <br />
          <AddMovie add={this.handleOnAdd} />
        </div>
        <hr />
        <div className="movie-list">
          <button onClick={this.handleShowAll}>All</button>
          <button onClick={this.handleFilterWatched}>Watched</button>
          <button onClick={this.handleFilterUnwatched}>Unwatched</button>
          {this.state.movies.map(movie => <Movie movie={movie} key={movie.title} watched={this.handleOnWatched} />)}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<MovieList />, document.getElementById('app'));
