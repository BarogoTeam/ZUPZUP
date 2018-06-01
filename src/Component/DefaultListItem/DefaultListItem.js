import React, { Component } from 'react';
import "./DefaultListItem.css"
import connect from "react-redux/es/connect/connect";
import {updateMovieInfo} from "../../Redux/Action/Movie";

class DefaultListItem extends Component {
    render() {
        let onClickFunc = () => {
            let newMovieInfo = this.props.movieInfo;
            newMovieInfo.reservationRate = 50;
            this.props.updateMovieInfo(newMovieInfo);
        };

        return (
            <div id="ListItem">
                <div className="innerItem" id="imgDiv">
                    <img width="100px" src={this.props.movieInfo.img}/>
                </div>
                <div className="innerItem" id="infoDiv">
                    <div id="title">
                        <header>{this.props.movieInfo.name}</header>
                    </div>
                    <div id="ageInfo">
                        연령 : {this.props.movieInfo.age}
                    </div>
                    <div id="scoreInfo">
                        평점 : {this.props.movieInfo.score}
                    </div>
                    <div id="reservationRateInfo">
                        예매율 : {this.props.movieInfo.reservationRate}
                    </div>
                    <div id="releaseDate">
                        개봉일 : {this.props.movieInfo.date}
                    </div>
                </div>
                <div className="innerItem" id="alarmDiv">
                    <button disabled={this.props.movieInfo.expired} onClick={onClickFunc}>
                        RATE UPDATE
                    </button>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        movies: state.Movie.movies
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        updateMovieInfo: (movieInfo) => {dispatch(updateMovieInfo(movieInfo))}
    }
};

DefaultListItem = connect(mapStateToProps, mapDispatchToProps)(DefaultListItem);

export default DefaultListItem;
