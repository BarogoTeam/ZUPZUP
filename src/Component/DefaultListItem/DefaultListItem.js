import React, { Component } from 'react';
import "./DefaultListItem.css"
import connect from "react-redux/es/connect/connect";
import {updateMovieInfo} from "../../Redux/Action/Movie";

class DefaultListItem extends Component {
    render() {
        const sampleJSON = {
            id: 1,
            img: "resources/SAMPLE_IMAGE.JPG",
            title: "ANY_TITLE",
            age: 15,
            score: 10,
            rate: 98.9,
            date: "2017-05-12",
            expired: false
        };

            console.log(this.props.movies);

            let onClickFunc = () => {
                console.log('test');
                this.props.updateMovieInfo({
                    id: 1,
                    reservationState: "OPEN",
                    reservationRate: 50,
                    rivalCount: 10
                })

            };

        return (
            <div id="ListItem">
                <div className="innerItem" id="imgDiv">
                    <img width="100px" src={sampleJSON.img}/>
                </div>
                <div className="innerItem" id="infoDiv">
                    <div id="title">
                        <header>{sampleJSON.title}</header>
                    </div>
                    <div id="ageInfo">
                        연령 : {sampleJSON.age}
                    </div>
                    <div id="scoreInfo">
                        평점 : {sampleJSON.score}
                    </div>
                    <div id="reservationRateInfo">
                        예매율 : {this.props.movies[0].reservationRate}
                    </div>
                    <div id="releaseDate">
                        개봉일 : {sampleJSON.date}
                    </div>
                </div>
                <div className="innerItem" id="alarmDiv">
                    <button enabled={!this.props.movies[0].expired} onClick={onClickFunc}>
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
