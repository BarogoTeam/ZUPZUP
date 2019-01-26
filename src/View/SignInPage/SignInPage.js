import React from "react";
import SignInService from "../../Service/SignInService";
import * as UI from "semantic-ui-react";
import {Redirect} from "react-router-dom";

export default class SignInPage extends React.Component {
  constructor() {
    super();
    this.state = {
      isSigned: localStorage.getItem("token"),
      email: 'ZupzupCrawler@zupzup.com',
      password: 'examplepassword'
    }
  }

  onSignInClick(email, password) {
    console.log(email, password);
    SignInService.signIn(email, password).then((token) => {
      localStorage.setItem("token", token);
      console.log("SignIn Success");
      this.setState({isSigned: true});
    }).catch((e) => {
      console.log("SignIn Failed", e);
    });
  }

  render() {
    return (
      <UI.Segment padded='very' textAlign='left' secondary>
        {this.state.isSigned && <Redirect to="/alarms" />}
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
            <UI.Button fluid color='teal' onClick={() => {this.onSignInClick(this.state.email, this.state.password)}}>Sign In</UI.Button>
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