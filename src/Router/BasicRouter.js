import {Route, Switch} from "react-router-dom";
import React, {Component} from "react";
import MoviesPage from "../View/MoviesPage/MoviesPage";
import AlarmsPage from "../View/AlarmsPage/AlarmsPage";
import NewAlarmPage from "../View/AlarmsPage/NewAlarmPage";

class BasicRouter extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={AlarmsPage} />
          <Route path="/alarms/new" component={NewAlarmPage} />
          <Route path="/alarms" component={AlarmsPage} />
          <Route path="/movies" component={MoviesPage} />
        </Switch>
      </main>
    )
  }
}

export default BasicRouter