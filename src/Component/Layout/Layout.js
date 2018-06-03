import React from 'react';
import * as UI from "semantic-ui-react";
import NavBar from '../NavBar/NavBar'
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

export default class Layout extends React.Component {

  constructor() {
    super();
    this.state = {
      activeMenu: null
    };
    this.activateMenu = this.activateMenu.bind(this);
  }

  activateMenu(menu) {
    this.setState({
      activeMenu: menu
    })
  }


  render() {
    const {activeMenu} = this.state;

    return (
      <div>
        <UI.Sidebar
          as={UI.Menu}
          animation='push'
          width='thin'
          icon='labeled'
          vertical
          inverted
          visible={activeMenu === 'left'}
        >
          <UI.Menu.Item name='home'>
            <UI.Icon name='home' />
            Home
          </UI.Menu.Item>
          <UI.Menu.Item name='gamepad'>
            <UI.Icon name='gamepad' />
            Games
          </UI.Menu.Item>
          <UI.Menu.Item name='alarms'>
            <Link to="/alarms" onClick={() => {this.activateMenu(null)}}>
              <UI.Icon name='camera' />
              Alarms
            </Link>
          </UI.Menu.Item>
          <UI.Menu.Item name='movies'>
            <Link to="/movies" onClick={() => {this.activateMenu(null)}}>
              <UI.Icon name='camera' />
              Movies
            </Link>
          </UI.Menu.Item>
        </UI.Sidebar>
        <UI.Dimmer.Dimmable blurring dimmed={activeMenu !== null}>
          <NavBar
            activeItem={'sign-in'}
            activateMenu={this.activateMenu}
          />
          <UI.Segment style={{marginTop: '40px'}}>
            {this.props.children}
          </UI.Segment>
          <UI.Dimmer
            inverted
            active={activeMenu !== null}
            style={{zIndex: 101}}
            onClick={() => {this.activateMenu(null)}}
          />
        </UI.Dimmer.Dimmable>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node
};