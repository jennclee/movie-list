import React from 'react';
import ReactDOM from 'react-dom';
import Movie from './components/Movie.jsx';
import Search from './components/Search.jsx';
import AddMovie from './components/AddMovie.jsx';

const axios = require('axios');

class MovieList extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      originalMovies: [],
      view: 'all'
    };
    this.handleOnSearch = this.handleOnSearch.bind(this);
    this.handleClearSearch = this.handleClearSearch.bind(this);
    this.handleOnAdd = this.handleOnAdd.bind(this);
    this.handleOnWatched = this.handleOnWatched.bind(this);
    this.handleFilterWatched = this.handleFilterWatched.bind(this);
    this.handleFilterUnwatched = this.handleFilterUnwatched.bind(this);
    this.handleShowAll = this.handleShowAll.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
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
    movie.watched = movie.watched ? !movie.watched : true;
    this.setState({
      view: this.state.view
    });
  }

  handleShowAll() {
    this.handleClearSearch();
    this.setState({
      view: 'all'
    });
  }

  handleFilterWatched() {
    this.handleClearSearch();
    this.setState({
      view: 'watched'
    });
  }

  handleFilterUnwatched() {
    this.handleClearSearch();
    this.setState({
      view: 'unwatched'
    });
  }

  handleViewChange() {
    if (this.state.view === 'all') {
      return this.state.movies;
    } else if (this.state.view === 'watched') {
      return this.state.movies.filter(movie => !!movie.watched);
    } else {
      return this.state.movies.filter(movie => !movie.watched);
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
          <br/>
          {this.state.view === 'all' ? <h4>Top 10 Movies:</h4> : null}
          {this.handleViewChange().map((movie) => {
          <Movie 
          movie={movie} 
          key={movie.title} 
          watched={this.handleOnWatched} />
          });
          }
        </div>
      </div>
    );
  }
}

ReactDOM.render(<MovieList />, document.getElementById('app'));
