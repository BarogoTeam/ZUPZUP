import React, { Component } from 'react';
import Movie from './Movie';

class MovieList extends Component {
  constructor(){
    super();
  }
  render() {
    const movies = this.props.movies;
    const handleDeleteMovie = this.props.handleDeleteMovie;
    console.log(movies);
    const movieList = movies.map(({movieId, movieName, done }) => {
      return (
          <Movie
            movieId = {movieId}
            movieName = {movieName}
            done = {done}
            onDeleteMovie = {() => handleDeleteMovie(movieId)}
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
