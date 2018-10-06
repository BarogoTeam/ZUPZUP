import React from "react";
import * as UI from 'semantic-ui-react';
import moment from "moment";

export default class DateModal extends React.PureComponent {
  renderTriggerButton() {
    return (
      <UI.Button color="teal" fluid circular>
        날짜 선택
      </UI.Button>
    )
  }

  constructor() {
    super();
    this.state = {
      selectedMonth: moment(new Date())
    }
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
    for(let i = 1; i <= this.state.selectedMonth.daysInMonth(); i++) {
      days.push({key: i, value: i, text: `${i}일`});
    }

    return (
      <UI.Modal.Content>
        {monthSelect}
        <UI.Select placeholder="일" options={days} />
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
      />
    )
  }
}