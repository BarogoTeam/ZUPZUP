import React, { Component } from 'react';
import MovieList from '../App/MovieList';
import Footer from '../App/Footer';
import connect from "react-redux/es/connect/connect";
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

MainPage = connect(mapStateToProps, mapDispatchToProps)(MainPage);

export default MainPage;
