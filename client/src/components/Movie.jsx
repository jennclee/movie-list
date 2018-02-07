import React from 'react';
import MovieDetails from './MovieDetails.jsx';

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <div>
        <div className="movie">
          <p>{this.props.movie.title}</p>
        </div>
      </div>
    );
  }
};
