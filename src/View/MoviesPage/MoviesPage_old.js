import React, {Component} from 'react';
import DefaultListItem from "../../Component/DefaultListItem/DefaultListItem";
import {connect} from "react-redux";
import {putMovieInfo} from "../../Redux/Action/Movie";
import * as UI from 'semantic-ui-react';
import PropTypes from "prop-types";

class MoviesPage extends Component {
  render() {

    const {movies} = this.props;

    return (
      <UI.Item.Group divided>
        {
          movies.map((movieInfo) =>
            <DefaultListItem key={movieInfo.id} movieInfo={movieInfo} />
          )
        }
      </UI.Item.Group>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    putMovieInfo: (movieInfo) => {dispatch(putMovieInfo(movieInfo))}
  }
};

const mapStateToProps = (state) => {
  return {
    movies: state.Movie.movies
  }
};

MoviesPage.propTypes = {
  movies: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesPage);

