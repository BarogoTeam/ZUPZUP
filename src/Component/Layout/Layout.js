import React from 'react';
import * as UI from "semantic-ui-react";
import NavBar from '../NavBar/NavBar'
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

export default class Layout extends React.Component {

  render() {
    return (
      <div>
        <NavBar activeItem={'sign-in'} /> {/* use state */}
        <UI.Sidebar as={UI.Menu} width='thin' icon='labeled' visible vertical inverted>
          <UI.Menu.Item name='home'>
            <UI.Icon name='home' />
            Home
          </UI.Menu.Item>
          <UI.Menu.Item name='gamepad'>
            <UI.Icon name='gamepad' />
            Games
          </UI.Menu.Item>
          <UI.Menu.Item name='alarms'>
            <Link to="/alarms">
              <UI.Icon name='camera' />
              Alarms
            </Link>
          </UI.Menu.Item>
          <UI.Menu.Item name='movies'>
            <Link to="/movies">
              <UI.Icon name='camera' />
              Movies
            </Link>
          </UI.Menu.Item>
        </UI.Sidebar>
        <UI.Segment basic>
          {this.props.children}
        </UI.Segment>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node
};