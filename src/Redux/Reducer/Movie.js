import {MOVIE} from "../../Constants";

const initialState = {
  movies: [{
    id: 1,
    name: "ANY_MOVIE_1",
    reservationRate: 5,
    img: "resources/SAMPLE_IMAGE.JPG",
    score: 8,
    age: 12,
    date: "1992-01-21",
    expired: true
  },{
    id: 2,
    name: "ANY_MOVIE_2",
    reservationRate: 10,
    img: "resources/SAMPLE_IMAGE.JPG",
    score: 7,
    age: 12,
    date: "2017-05-12",
    expired: false
  },{
    id: 3,
    name: "ANY_MOVIE_3",
    reservationRate: 15,
    img: "resources/SAMPLE_IMAGE.JPG",
    score: 5,
    age: 15,
    date: "2017-07-17",
    expired: false
  }]
};

export function Movie(state = initialState, action) {
  let newMovies;

  switch(action.type) {
  case MOVIE.ACTION.PUT_MOVIE_INFO:
    newMovies = state.movies;
    newMovies.push(action.movieInfo);

    return Object.assign({}, state, {movies: newMovies});

  case MOVIE.ACTION.UPDATE_MOVIE_INFO:
    newMovies = state.movies.map((element) => {
      if(element.id !== action.movieInfo.id) {
        return element;
      }

      return action.movieInfo;
    });

    return Object.assign({}, state, {movies: newMovies});

  case MOVIE.ACTION.REMOVE_MOVIE_INFO:
    newMovies = state.movies.filter(movie => movie.id !== action.movieId);

    return Object.assign({}, state, {movies: newMovies});

  default:
    break;
  }

  return state;
}