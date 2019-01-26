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
    //const weekDays = ['일', '월', '화', '수', '목', '금', '토']; TODO 요일설정은 나중에  by thesun.kim

    return (
      <UI.Grid.Column>
        <UI.Image fluid
                       label={{ as: 'a', color: 'red', content: '롯데시네마', ribbon: true}}
                       disabled={!this.state.isRun} size='large' src={this.props.alarmInfo.img} />
        <UI.Item.Content>
          <UI.Header size='large'><UI.Header.Subheader><br/></UI.Header.Subheader>{this.props.alarmInfo.name}
          </UI.Header>
          <UI.Item.Extra>
            <div>
              {this.props.alarmInfo.cinemaNames.map((cinemaName) => <UI.Label key={cinemaName}>{cinemaName}</UI.Label>)}
            </div>
            <div>
              {this.props.alarmInfo.cinemaTypes.map((cinemaType) => <UI.Label key={cinemaType}>{cinemaType}관</UI.Label>)}
            </div>
            <div>
              <UI.Label tag color='black'><UI.Icon name={this.props.alarmInfo.reservationNumber === 1 ? "user" : "users"} />{this.props.alarmInfo.reservationNumber}</UI.Label>
              <UI.Label tag color='teal'><UI.Icon name="calendar alternate outline" />{this.props.alarmInfo.date}</UI.Label>
            </div>
            <div>
              <UI.Label tag color='blue'><UI.Icon name="check circle outline" />{this.props.alarmInfo.startTime}</UI.Label>
              <UI.Label tag color='gray'><UI.Icon name="times circle outline" />{this.props.alarmInfo.endTime}</UI.Label>
            </div>
            {/*<div>
              {this.props.alarmInfo.weekDays.map((day) => <UI.Label key={day}>{weekDays[day]}</UI.Label>)}
            </div>*/}
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