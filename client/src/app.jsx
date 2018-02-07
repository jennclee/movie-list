import React from 'react';
import ReactDOM from 'react-dom';
import Movie from './components/Movie.jsx';
import Search from './components/Search.jsx';

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
      searchText: '',
    };
  }

  search(text) {
    this.setState({
      searchText: text
    });
  }

  render() {
    return (
      <div>
        <div className="navbar">
          <Search search={this.search} />
        </div>
        {this.state.movies.map((movie) => {
          return <Movie movie={movie} key={movie.title} />;
        })}
      </div>
    );
  }
}

ReactDOM.render(<MovieList />, document.getElementById('app'));
