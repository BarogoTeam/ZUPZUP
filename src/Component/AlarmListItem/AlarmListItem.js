import React from 'react';
import * as UI from "semantic-ui-react";
import PropTypes from 'prop-types';

class AlarmListItem extends React.PureComponent {
  static propTypes = {
    alarmInfo: PropTypes.object.isRequired,
  }

  state = {isRun: this.props.alarmInfo.isRun} // 질문(재연): 이부분 오작동 안하는지 검토부탁해요.

  toggleRunMode = () => this.setState({isRun: !this.state.isRun})

  render() {
    return (
      <UI.Grid.Column>
        <UI.Image fluid
                       label={{ as: 'a', color: 'red', content: '롯데시네마', ribbon: true}}
                       disabled={!this.state.isRun} src={this.props.alarmInfo.img} />
        <UI.Item.Content>
          <UI.Header size='large'><UI.Header.Subheader><br/></UI.Header.Subheader>{this.props.alarmInfo.name}
          </UI.Header>
          <UI.Item.Extra>
            <div>
              <UI.Label tag color='black'><UI.Icon name={this.props.alarmInfo.reservationNumber === 1 ? "user" : "users"} />{this.props.alarmInfo.reservationNumber}</UI.Label>
              <UI.Label tag color='teal'><UI.Icon name="calendar alternate outline" />{this.props.alarmInfo.playDate}</UI.Label>
            </div>
            <div>
              {this.props.alarmInfo.sequences.map((sequence, index) => <UI.Label tag color='blue' key={index}>
                <UI.Icon name="check circle outline" />{sequence.screenNameKr}<br/>{sequence.screenDivisionNameKr}<br/>{sequence.startTime} ~ {sequence.endTime}</UI.Label>)}
            </div>
            <div className="ui right floated">
              <UI.Checkbox toggle checked={this.state.isRun} onClick={this.toggleRunMode} />
            </div>
          </UI.Item.Extra>
        </UI.Item.Content>
      </UI.Grid.Column>
    )
  }
}

export default AlarmListItem;