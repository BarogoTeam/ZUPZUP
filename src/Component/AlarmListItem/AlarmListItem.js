import React, { Component } from 'react';
import * as UI from "semantic-ui-react";

class AlarmListItem extends Component {
  alarmInfo = this.props.alarmInfo
  state = {isRun: this.alarmInfo.isRun}

  toggleRunMode = () => {
    this.setState({isRun: !this.state.isRun})
  }

  render() {
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

    return (
      <UI.Item >
        <UI.Item.Image disabled={!this.state.isRun} size='large' src={this.alarmInfo.img} />
        <UI.Item.Content>
          <UI.Item.Header>{this.alarmInfo.name}</UI.Item.Header>
          <UI.Item.Extra>
            {this.alarmInfo.cinemaNames.map((cinemaName) => <UI.Label>{cinemaName}</UI.Label>)}<br/>
            {this.alarmInfo.cinemaTypes.map((cinemaType) => <UI.Label>{cinemaType}</UI.Label>)}<br/>
            <UI.Label><UI.Icon name={this.alarmInfo.reservationNumber === 1 ? "user icon" : "users icon"}/>{this.alarmInfo.reservationNumber}</UI.Label><br/>
            <UI.Label><UI.Icon name="calendar alternate outline icon"/>{this.alarmInfo.startDate}</UI.Label>
            <UI.Label><UI.Icon name="calendar times outline icon"/>{this.alarmInfo.endDate}</UI.Label><br/>
            <UI.Label><UI.Icon name="check circle outline icon"/>{this.alarmInfo.startTime}</UI.Label>
            <UI.Label><UI.Icon name="times circle outline icon"/>{this.alarmInfo.endTime}</UI.Label><br/>
            {this.alarmInfo.weekDays.map((day) => <UI.Label>{weekDays[day]}</UI.Label>)}<br/>
          </UI.Item.Extra>
          <div style={{textAlign: "right"}}><UI.Checkbox toggle defaultChecked={this.alarmInfo.isRun} onClick={this.toggleRunMode}/></div>

        </UI.Item.Content>
      </UI.Item>
    )
  }
}

export default AlarmListItem;