import React from "react";
import LoginService from "../../Service/LoginService";
import {Header} from "../../Service/ServiceUtil";
import * as UI from "semantic-ui-react";

export default class SignInPage extends React.Component {
  constructor() {
    super();
    this.state = {
      password: ''
    }
  }

  loginClick(email, password) {
    console.log(email, password);
    LoginService.signIn(email, password).then((token) => {
      Header.append('Authorization', 'Bearer ' + token);
      console.log("Login Success");
    }).catch((e) => {
      console.log("Login Failed", e);
    });
  }

  render() {
    return (
      <UI.Segment padded='very' textAlign='left' secondary>
        <UI.Form>
          <UI.Form.Field>
            <label>EMAIL</label>
            <UI.Input icon='user' iconPosition='left' placeholder='Email' onChange={(event, target) => {
              this.setState({
                email: target.value
              })
            }} />
          </UI.Form.Field>
          <UI.Form.Field>
            <label>PASSWORD</label>
            <UI.Input icon='lock' iconPosition='left' placeholder='Password' onChange={(event, target) => {
              this.setState({
                password: target.value
              })
            }} />
          </UI.Form.Field>
          <UI.Form.Field>
            <UI.Button fluid color='teal' onClick={() => {this.loginClick(this.state.email, this.state.password)}}>Sign In</UI.Button>
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