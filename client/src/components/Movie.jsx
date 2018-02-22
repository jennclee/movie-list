import React from 'react';
import MovieDetails from './MovieDetails.jsx';

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnWatched = this.handleOnWatched.bind(this);
  }

  handleOnWatched() {
    this.props.watched(this.props.movie);
  }

  render() {
    return (
      <div>
        <div className="movie">
          <p>{this.props.movie.title} {this.props.movie.watched ? <i className="material-icons">done</i> : null}</p>
          <button onClick={this.handleOnWatched}>Watched</button>
        </div>
      </div>
    );
  }
}
