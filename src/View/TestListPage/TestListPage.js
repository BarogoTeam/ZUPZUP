import React, {Component} from 'react';
import DefaultListItem from "../../Component/DefaultListItem/DefaultListItem";
import {connect} from "react-redux";
import {putMovieInfo} from "../../Redux/Action/Movie";

class TestListPage extends Component {
  render() {
    let items = this.props.movies.map((movieInfo) => {
      return <DefaultListItem key={movieInfo.id} movieInfo={movieInfo} />
    });

    return (
      <div id="TestListPage" className="App">
        {items}
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
    movies: state.Movie.movies
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestListPage);
