import React from 'react';
import * as UI from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class NavBar extends React.Component {
  render() {
    const {activeItem} = this.props;
    return (
      <UI.Menu fixed>
        <UI.Menu.Item>
          <img src='/logo.png' />
        </UI.Menu.Item>

        <UI.Menu.Item
          name='features'
          active={activeItem === 'features'}
          onClick={this.handleItemClick}
        >
          Features
        </UI.Menu.Item>

        <UI.Menu.Item
          name='testimonials'
          active={activeItem === 'testimonials'}
          onClick={this.handleItemClick}
        >
          Testimonials
        </UI.Menu.Item>

        <UI.Menu.Item
          name='sign-in'
          active={activeItem === 'sign-in'}
          onClick={this.handleItemClick}
          position='right'
        >
          Sign-in
        </UI.Menu.Item>
      </UI.Menu>
    )
  }
}

NavBar.propTypes = {
  activeItem: PropTypes.oneOf(['features', 'testimonials', 'sign-in']),
};
