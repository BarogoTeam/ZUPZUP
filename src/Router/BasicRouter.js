import {Route, Switch} from "react-router-dom";
import React, {Component} from "react";
import TestListPage from "../View/TestListPage/TestListPage";
import MainPage from "../View/MainPage/MainPage";

class BasicRouter extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/test" component={TestListPage} />
        </Switch>
      </main>
    )
  }
}

export default BasicRouter