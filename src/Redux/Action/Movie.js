export function putMovieInfo(movieInfo) {
    return {
        type: "PUT_MOVIE_INFO",
        movieInfo: movieInfo
    }
}
export function updateMovieInfo(movieInfo) {
    return {
        type: "UPDATE_MOVIE_INFO",
        movieInfo: movieInfo
    }
}