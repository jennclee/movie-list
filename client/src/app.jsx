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
        { title: 'Mean Girls' },
        { title: 'Hackers' },
        { title: 'The Grey' },
        { title: 'Sunshine' },
        { title: 'Ex Machina' },
      ],
      originalMovies: [],
    };
    this.handleOnSearch = this.handleOnSearch.bind(this);
    this.handleClearSearch = this.handleClearSearch.bind(this);
    this.handleOnAdd = this.handleOnAdd.bind(this);
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

  render() {
    return (
      <div>
        <div className="navbar">
          <Search search={this.handleOnSearch} clear={this.handleClearSearch} />
          <AddMovie add={this.handleOnAdd} />
        </div>
        <hr />
        <div className="movie-list">
          {this.state.movies.map((movie) => {
            return <Movie movie={movie} key={movie.title} />;
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<MovieList />, document.getElementById('app'));
