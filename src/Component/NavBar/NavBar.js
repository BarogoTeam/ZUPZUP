import React from 'react';
import * as UI from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class NavBar extends React.PureComponent {
  render() {
    const {activeItem, activateMenu} = this.props;
    return (
      <UI.Menu fixed='top'>
        <UI.Menu.Item
          onClick={() => {activateMenu('left')}}
        >
          <img src='/resources/SAMPLE_IMAGE.JPG' alt="LOGO" />
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
      </UI.Menu>
    )
  }
}

NavBar.propTypes = {
  activeItem: PropTypes.oneOf(['features', 'testimonials', 'sign-in']),
  activateMenu: PropTypes.func.isRequired
};
