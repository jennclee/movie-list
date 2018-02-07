import React from 'react';
import ReactDOM from 'react-dom';
import Movie from './components/Movie.jsx';

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
    };
  }

  render() {
    return (
      <div>
        {this.state.movies.map((movie) => {
          return <Movie movie={movie} key={movie.title} />;
        })}
      </div>
    );
  }
}

ReactDOM.render(<MovieList />, document.getElementById('app'));
