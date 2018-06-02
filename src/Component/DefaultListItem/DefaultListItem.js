import React, { Component } from 'react';
import "./DefaultListItem.css";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as UI from "semantic-ui-react";

class DefaultListItem extends Component {
  render() {

    const {movieInfo} = this.props;

    return (
      <UI.Item>
        <UI.Item.Image size='large' src={movieInfo.img} />

        <UI.Item.Content>
          <UI.Item.Header>{movieInfo.name}</UI.Item.Header>
          <UI.Item.Extra>

            <UI.Label>{movieInfo.age}</UI.Label>
            <UI.Label>{movieInfo.score}</UI.Label>
            <UI.Label>{movieInfo.reservationRate}</UI.Label>
            <UI.Label>{movieInfo.date}</UI.Label>
          </UI.Item.Extra>
        </UI.Item.Content>
      </UI.Item>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.Movie.movies
  }
};

DefaultListItem.propTypes = {
  movieInfo: PropTypes.object
};

export default connect(mapStateToProps)(DefaultListItem);
