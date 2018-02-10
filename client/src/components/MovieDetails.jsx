import React from 'react';

export default const MovieDetails = () => {
  return (
    <div>
      <div>
        <p>Year: {this.props.movie.year}</p>
        <p>Runtime: {this.props.movie.runtime}</p>
        <p>Metascore: {this.props.movie.metascore}</p>
        <p>IMDB Rating: {this.props.movie.rating}</p>
        <p>Watched: {this.props.movie.watched ? 'O' : 'X'}</p>
      </div>
      <div>
        <img src={this.props.movie.image} />
      </div>
    </div>
  )
}
