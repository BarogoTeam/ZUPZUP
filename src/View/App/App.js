import React, { Component } from 'react';
import Header from './Header';
import BasicRouter from "../../Router/BasicRouter";


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <BasicRouter />
      </div>
    )
  }
}

export default App
