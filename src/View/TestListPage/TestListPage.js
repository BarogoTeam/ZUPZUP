import React, {Component} from 'react';
import DefaultListItem from "../../Component/DefaultListItem/DefaultListItem";
import connect from "react-redux/es/connect/connect";
import {putMovieInfo} from "../../Redux/Action/Movie";


class TestListPage extends Component {

    render() {
        this.props.putMovieInfo({
            id: 1,
            reservationState: "OPEN",
            reservationRate: 5,
            rivalCount: 10
        });

        return (
            <div id="TestListPage" className="App">
                <DefaultListItem movieInfo={this.props.movieInfo}/>
            </div>
        );
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        putMovieInfo: (movieInfo) => {dispatch(putMovieInfo(movieInfo))}
    }
};

let mapStateToProps = (state) => {
    return {
        movies: state.movies
    }
};

TestListPage = connect(mapStateToProps, mapDispatchToProps)(TestListPage);

export default TestListPage;