import {MOVIE} from "../../Constants";

export function removeMovieInfo(movieId) {
  return {
    type: MOVIE.ACTION.REMOVE_MOVIE_INFO,
    movieId
  }
}
export function putMovieInfo(movieInfo) {
  return {
    type: MOVIE.ACTION.PUT_MOVIE_INFO,
    movieInfo
  }
}
export function updateMovieInfo(movieInfo) {
  return {
    type: MOVIE.ACTION.UPDATE_MOVIE_INFO,
    movieInfo
  }
}