import React, { Component } from 'react';
import Header from './Header';
import MovieList from './MovieList';
import Footer from './Footer';
import './App.css';

const newId = () => Date.now();

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      movies: [
          {movieId: 1000, movieName: '어벤져스'},
          {movieId: 1001, movieName: '데드풀2'},
          {movieId: 1002, movieName: '앤트맨'}
      ],
        editing: null
    }
  }

  handleAddMovie(movieName){
    this.setState([...this.state.movies, {
        movieId: newId(),
        movieName: movieName
    }]);
  }

  handleDeleteMovie(movieId){
      const newMovies = [...this.state.movies];
      const deleteIndex = newMovies.map(v=> v.movieId === movieId);
      newMovies.splice(deleteIndex, 1);
      this.setState({
          movies: newMovies
      })
  }

  render() {
    const movies = this.state.movies;
    return (
        <div className="movie-app">
          <Header handleAddMovie={(movieName) => this.handleAddMovie(movieName)}/>
          <MovieList
            movies={movies}
            handleDeleteMovie={movieId=>this.handleDeleteMovie(movieId)}
          />
          <Footer/>
        </div>
      )
  }
}
export default App;
