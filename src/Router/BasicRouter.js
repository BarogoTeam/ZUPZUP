import {Route, Switch} from "react-router-dom";
import React from "react";
import MoviesPage from "../View/MoviesPage/MoviesPage";
import AlarmsPage from "../View/AlarmsPage/AlarmsPage";
import NewAlarmPage from "../View/AlarmsPage/NewAlarmPage";
import ScreensPage from "../View/ScreensPage/ScreensPage";

class BasicRouter extends React.Component { // SUGGESTION: Move back to App.js, this kind of separation does not improve anything
  render() {
    return (
      <Switch>
        <Route exact path="/" component={AlarmsPage} />
        <Route path="/alarms/new" component={NewAlarmPage} />
        <Route path="/alarms" component={AlarmsPage} />
        <Route path="/movies" component={MoviesPage} />
        <Route path="/screens" component={ScreensPage} />
      </Switch>
    )
  }
}

export default BasicRouter