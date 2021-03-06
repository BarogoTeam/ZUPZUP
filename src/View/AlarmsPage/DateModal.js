import React from "react";
import * as UI from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from "moment";
import _ from 'lodash';

export default class DateModal extends React.PureComponent {
  static propTypes = {
    onAlarmDateChanged: PropTypes.func,
    selectedDate: PropTypes.string
  }
  static defaultProps = {
    onAlarmDateChanged: () => {},
  }
  
  renderTriggerButton() {
    return (
      <UI.Button color="teal" fluid circular>
        {_.isEmpty(this.props.selectedDate) ? "날짜 선택" : this.props.selectedDate}
      </UI.Button>
    )
  }

  constructor() {
    super();
    this.state = {
      selectedMonth: moment(new Date()),
      selectedDay: moment(new Date()) //TODO: Month 는 월만 저장하고 Day 는 월과 일을 저장하는 로직 가독성 개선 필요 - Conan
    }
  }

  handleAlarmDateClick = (alarmDate) => {
    this.setState({
      alarmDate
    })
  }

  handleActionClick = () => {
    //console.log(this.state.selectedDay.format('YYYYMMDD'))
    this.props.onAlarmDateChanged(this.state.selectedDay.format("YYYY-MM-DD"))
  }

  renderContent() {
    const test = [];

    let date = moment(new Date());

    for(let i = 0; i <= 5; i++) {
      test.push({key: i, value: i, text: `${date.format("YYYY년 MM월")}`});
      date.add(1, 'months');
    }

    let monthSelect = <UI.Select placeholder='년 월' options={test} onChange={(event, target) => {
      this.setState({
        selectedMonth: moment(new Date()).add(target.value, "months")
      })
    }} />

    let days = [];
    let startDay = this.state.selectedMonth.isSame(new Date() , 'month') ? date.get('date') : 1;
    for(let i = startDay; i <= this.state.selectedMonth.daysInMonth(); i++) {
      days.push({key: i, value: i, text: `${i}일`});
    }

    let daySelect = <UI.Select placeholder="일" options={days} onChange={(event, target) =>{
      this.setState({
        selectedDay : this.state.selectedMonth.set("date",target.value)
      })
    }} />

    return (
      <UI.Modal.Content>
        {monthSelect}
        {daySelect}
      </UI.Modal.Content>
    )
  }

  render() {
    return (
      <UI.Modal
        header="날짜 선택"
        trigger={this.renderTriggerButton()}
        content={this.renderContent()}
        actions={[
          <UI.Button key='gotit' color='green'>
            <UI.Icon name='checkmark' /> 완료
          </UI.Button>
        ]}
        onActionClick={this.handleActionClick}
      />
    )
  }
}