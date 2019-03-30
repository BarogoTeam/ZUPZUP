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

  render() {
    if(!sessionStorage.getItem("token")) {
      let savedId = localStorage.getItem("chatId");
      return savedId ?
        <Redirect to={"/signin/?chatId=" + savedId} /> :
        <Redirect to={"/signin"} />
    }

    if(!this.state.loaded) {
      return (
        <UI.Form>
          <div style={{height: "400px"}}>
            <UI.Dimmer inverted active={true}>
              <UI.Loader>Loading</UI.Loader>
            </UI.Dimmer>
          </div>
        </UI.Form>
      );
    }

    const screenMovies = this.state.screenMovies;

    return (
      <UI.Form>
        <div>
          <UI.Grid columns={2}>
            {
              screenMovies.filter((movieInfo) => {
                return movieInfo.representationMovieCode !== "AD"
              }).map((movieInfo) =>
                <ScreenMoviesItem key={movieInfo.representationMovieCode} movieInfo={movieInfo}/>
              )
            }
          </UI.Grid>
        </div>
      </UI.Form>
    )
  }
}
export default MoviesPage;
