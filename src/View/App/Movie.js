import React, { Component } from 'react';

class Movie extends Component {
  constructor(){
    super();
  }
  render() {
    const movieName = this.props.movieName;
    const onDeleteMovie = this.props.onDeleteMovie;
    return (
      <li className="movie-item">
        <div className="toggle" />
        <div className="movie-item__view">
          <div className="movie-item__view__movieName">
            {movieName}
          </div>
          <button className="movie-item__destroy"
            onClick={onDeleteMovie} />
        </div>
      </li>
    )
  }
}
export default Movie;
