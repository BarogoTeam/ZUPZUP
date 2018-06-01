import React, { Component } from 'react';
import Movie from './Movie';

class MovieList extends Component {
  constructor(){
    super();
  }
  render() {
    const movies = this.props.movies;
    const handleDeleteMovie = this.props.handleDeleteMovie;
    const movieList = movies.map(({ id, name, reservationState }) => {
      return (
        <Movie key={id}
          movieId={id}
          movieName={name}
          done={reservationState}
          onDeleteMovie={() => handleDeleteMovie(id)}
        />
      )
    });

    return (
      <div className="movie-app__main">
        <ul className="movie-list">
          {movieList}
        </ul>
      </div>
    )
  }
}
export default MovieList;
