import React from 'react';
import * as UI from 'semantic-ui-react';
import MovieService from "../../Service/MovieService";
import ScreenMoviesItem from '../../Component/ScreenMoviesItem/ScreenMoviesItem';
import {Redirect} from "react-router-dom";
class MoviesPage extends React.Component {

  constructor() {
    super();
    this.state = {
      loaded: null,
      screenMovies: null
    };
    
  }

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
        {!sessionStorage.getItem("token") && <Redirect to="/" />}
        {this.drawScreenMovies()};
      </UI.Form>
    );
  }
}
export default MoviesPage;
