import React from 'react';
import * as UI from 'semantic-ui-react';
import _ from 'lodash';
import AlarmService from '../../Service/AlarmService';

export default class Screens extends React.PureComponent {
  constructor() {
    super()
    this.state = {
    }
  }

  componentDidMount() {
    AlarmService.getScreens(this.props.cinemaCodes, this.props.alarmDate)
  }

  render() {
    return (
      <UI.Item.Group divided>
        <UI.Item>
          <UI.Item.Content>
            <UI.Item.Header as='a'>건대 입구점</UI.Item.Header>
            <UI.Item.Meta>
              <span className='cinema'>데드풀2</span>
            </UI.Item.Meta>
            <UI.Item.Extra>
              <UI.Label>16:30~18:30</UI.Label>
              <UI.Label>18:30~19:30</UI.Label>
            </UI.Item.Extra>
          </UI.Item.Content>
        </UI.Item>
      </UI.Item.Group>

    )
  }
}
