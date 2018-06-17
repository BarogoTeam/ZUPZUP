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
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

    return (
      <UI.Item >
        <UI.Item.Image disabled={!this.state.isRun} size='large' src={this.props.alarmInfo.img} />
        <UI.Item.Content>
          <UI.Item.Header>{this.props.alarmInfo.name}</UI.Item.Header>
          <UI.Item.Extra>
            <div>
              {this.props.alarmInfo.cinemaNames.map((cinemaName) => <UI.Label key={cinemaName}>{cinemaName}</UI.Label>)}
            </div>
            <div>
              {this.props.alarmInfo.cinemaTypes.map((cinemaType) => <UI.Label key={cinemaType}>{cinemaType}</UI.Label>)}
            </div>
            <div>
              <UI.Label><UI.Icon name={this.props.alarmInfo.reservationNumber === 1 ? "user" : "users"} />{this.props.alarmInfo.reservationNumber}</UI.Label>
              <UI.Label><UI.Icon name="calendar alternate outline" />{this.props.alarmInfo.startDate}</UI.Label>
              <UI.Label><UI.Icon name="calendar times outline" />{this.props.alarmInfo.endDate}</UI.Label>
            </div>
            <div>
              <UI.Label><UI.Icon name="check circle outline" />{this.props.alarmInfo.startTime}</UI.Label>
              <UI.Label><UI.Icon name="times circle outline" />{this.props.alarmInfo.endTime}</UI.Label>
            </div>
            <div>
              {this.props.alarmInfo.weekDays.map((day) => <UI.Label key={day}>{weekDays[day]}</UI.Label>)}
            </div>
            <div className="ui right floated">
              <UI.Checkbox toggle checked={this.state.isRun} onClick={this.toggleRunMode} />
            </div>
          </UI.Item.Extra>

        </UI.Item.Content>
      </UI.Item>
    )
  }
}

export default AlarmListItem;