import React, { Component } from 'react';
import MovieList from '../App/MovieList';
import {connect} from "react-redux";
import {putMovieInfo, removeMovieInfo} from "../../Redux/Action/Movie";

class MainPage extends Component {
  handleDeleteMovie(movieId){
    this.props.removeMovieInfo(movieId);
  }


  render() {
    const movies = this.props.movies;
    return (
      <div id="Main" className="movie-app">
        <MovieList
          movies={movies}
          handleDeleteMovie={movieId=>this.handleDeleteMovie(movieId)}
        />
      </div>
    )
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    putMovieInfo: (movieInfo) => {dispatch(putMovieInfo(movieInfo))},
    removeMovieInfo: (movieId) => {dispatch(removeMovieInfo(movieId))}
  }
};

let mapStateToProps = (state) => {
  return {
    movies: state.Movie.movies
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
