import React, { Component } from 'react';
import Header from './Header';
import MovieList from './MovieList';
import Footer from './Footer';
import './App.css';
import TestListPage from "../TestListPage/TestListPage";
import connect from "react-redux/es/connect/connect";
import {putMovieInfo, removeMovieInfo} from "../../Redux/Action/Movie";

const newId = () => Date.now();

class App extends Component {
  handleAddMovie(movieName){
      this.props.putMovieInfo({
          id: newId(),
          name: movieName,
          reservationState: 'NONE'
      });
  }

  handleDeleteMovie(movieId){
      this.props.removeMovieInfo(movieId);
  }

    render() {
        const movies = this.props.movies;
        return (
            <div id="Main" className="movie-app">
                <Header handleAddMovie={(movieName) => this.handleAddMovie(movieName)}/>
                <MovieList
                    movies={movies}
                    handleDeleteMovie={movieId=>this.handleDeleteMovie(movieId)}
                />
                <TestListPage/>
                <Footer/>
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

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
