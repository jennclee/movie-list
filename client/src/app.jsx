import React from 'react';
import ReactDOM from 'react-dom';
import Movie from './components/Movie.jsx';
import Search from './components/Search.jsx';
import AddMovie from './components/AddMovie.jsx';

class MovieList extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        { title: 'Mean Girls', watched: false },
        { title: 'Hackers', watched: false },
        { title: 'The Grey', watched: false },
        { title: 'Sunshine', watched: false },
        { title: 'Ex Machina', watched: false },
      ],
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
    let searchResults = [];
    const movieList = this.state.movies;
    for (let i = 0; i < movieList.length; i++) {
      if (movieList[i].title.includes(text)) {
        searchResults.push(movieList[i]);
      }
    }
    if (searchResults.length === 0) {
      searchResults = [
        { title: 'There are no movies on your list with this title. Please try another search term!' }
      ];
    }
    this.setState({
      movies: searchResults
    });
  }

  handleOnAdd(movie) {
    const newMovieList = this.state.movies;
    newMovieList.push({ title: movie });
    this.setState({
      movies: newMovieList
    });
    // TODO: Check if movie is already in list
  }

  handleOnWatched(movie) {
    let updatedMovies = this.state.movies;
    for (let i = 0; i < updatedMovies.length; i++) {
      if (updatedMovies[i].title === movie.title) {
        updatedMovies[i].watched = !updatedMovies[i].watched;
      }
    }
  }

  handleShowAll() {
    if (this.state.originalMovies.length > this.state.movies.length) {
      this.setState({
        movies: this.state.originalMovies
      });
    }
    console.log(this.state.originalMovies);
  }

  handleFilterWatched() {
    const watchedMovies = this.state.originalMovies.filter((movie) => {
      return movie.watched === true;
    });
    console.log(watchedMovies);
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
    console.log(unwatchedMovies);
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
          {this.state.movies.map((movie) => {
            return <Movie movie={movie} key={movie.title} watched={this.handleOnWatched} />;
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<MovieList />, document.getElementById('app'));
