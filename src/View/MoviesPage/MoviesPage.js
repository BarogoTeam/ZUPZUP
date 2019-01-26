import React from 'react';
import * as UI from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import MovieService from "../../Service/MovieService";
import ScreenMoviesItem from '../../Component/ScreenMoviesItem/ScreenMoviesItem';
import {ArrayClone, replaceAll} from "../../CommonUtil";
class MoviesPage extends React.Component {
/* UI 그릴 때 prop type check
  static propTypes = {
    movieCode: PropTypes.arrayOf(PropTypes.object),
    onSeatsChanged: PropTypes.func
  };

  static defaultProps = {
    posterUrl: null,
    movieCode: [],
  };
*/
  constructor() {
    super();
    this.state = {
      loaded: null,
      screenMovies: null
    };
    
  }
/*
  shouldComponentUpdate() {
    return this.state.posterUrl === null;
  }
*/
  componentDidMount() {
      MovieService.getScreenMovies().then((response) => {

        this.setState({
          loaded: true,
          screenMovies: response
        })
      })
  }
  drawScreenMovies() {
    if(this.state.loaded) {
      const screenMovies = this.state.screenMovies;
   return (
    <div>
      <UI.Grid columns={2}>
        {
          screenMovies.filter((movieInfo) => {
            return movieInfo.representationMovieCode !== "AD" 
          }).map((movieInfo) =>
            <ScreenMoviesItem key={movieInfo.representationMovieCode} movieInfo={movieInfo} />
          )
        }
      </UI.Grid>
    </div>
  ); 
    } else {
      return (
        <div style={{height: "400px"}}>
          <UI.Dimmer inverted active={true}>
            <UI.Loader>Loading</UI.Loader>
          </UI.Dimmer>
        </div>)
    }
  }

  render() {
    return (
      <UI.Form>
        {this.drawScreenMovies()};
      </UI.Form>
    );
  }
}
export default MoviesPage;
