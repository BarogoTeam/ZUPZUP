import React from "react";
import * as UI from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default class LoginSegment extends React.PureComponent {
  static propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    onSessionChanged: PropTypes.func,
  }
  static defaultProps = {
    onSessionChanged: () => {},
  }
  
  renderTriggerMenuItem() {

  }

  constructor() {
    super();
    this.state = {
     
    }
  }

  handleSignInClick = () => {
    this.setState({
      
    })
  }

  handleActionClick = () => {
    
    this.props.onSessionChanged()
  }

  renderContent() {
    
    let emailInput = <UI.Input type="text" placeholder="username@email.com" onChange={(event, target) => {
      this.setState({
        email: target.value
      })
    }}/>

    let passwordInput =  <UI.Input type="text" placeholder="password" onChange={(event, target) => {
      this.setState({
        password: target.value
      })
    }}/>

    return (
      <UI.Segment>
        {emailInput}
        {passwordInput}
      </UI.Segment>
    )
  }

  render() {
    return (
      <UI.Segment padded='very' textAlign='left' secondary='true'>
        <UI.Form>
          <UI.Form.Field>
            <label>EMAIL</label>
            <UI.Input icon='user' iconPosition='left' placeholder='Email'></UI.Input>
          </UI.Form.Field>
          <UI.Form.Field>
            <label>PASSWORD</label>
            <UI.Input icon='lock' iconPosition='left' placeholder='Password'></UI.Input>
          </UI.Form.Field>
          <UI.Form.Field>
          <UI.Button fluid color='teal'>Sign In</UI.Button>
          </UI.Form.Field>
          <UI.Form.Field>
          <UI.ButtonGroup attached='bottom' widths='2'>
            <UI.Button floated='left'>Join</UI.Button>
            <UI.Button floated='right'>Find ID/PW</UI.Button>
          </UI.ButtonGroup>
          </UI.Form.Field> 
                   
        </UI.Form>
      </UI.Segment>  
    )
  }
}