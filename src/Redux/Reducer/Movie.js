
const initialState = {
    movies: [{
        id: 1,
        reservationRate: 5
    },{
        id: 2,
        reservationRate: 10
    },{
        id: 3,
        reservationRate: 15
    }],
    ANY_STATE: "ANY_STATE"
};

export function Movie(state = initialState, action) {
    switch(action.type) {
        case "PUT_MOVIE_INFO":
            console.log("PUT_MOVIE_INFO");

            let movies = state.movies;
            movies.push(action.movieInfo);

            return Object.assign({}, state, {movies: movies});

        case "UPDATE_MOVIE_INFO":
            console.log("UPDATE_MOVIE_INFO");

            let newMovies = state.movies.map((element) => {
                if(element.id !== action.movieInfo.id) {
                    return element;
                }

                return action.movieInfo;
            });

            return Object.assign({}, state, {movies: newMovies});

        default:
            break;
    }

    return state;
}