import {Route, Switch} from "react-router-dom";
import React, {Component} from "react";
import MoviesPage from "../View/MoviesPage/MoviesPage";
import MainPage from "../View/MainPage/MainPage";

class BasicRouter extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/alarms" component={MainPage} />
          <Route path="/movies" component={MoviesPage} />
        </Switch>
      </main>
    )
  }
}

export default BasicRouter