import React from 'react';
import * as UI from 'semantic-ui-react';
import {Link} from "react-router-dom";
import AlarmListItem from '../../Component/AlarmListItem/AlarmListItem';
import AlarmService from "../../Service/AlarmService";

class AlarmsPage extends React.PureComponent {
  constructor() {
    super();
    this.state = { alarms: [] };
  }

  componentDidMount() {
    AlarmService.getAlarms().then((alarms)=> {
      this.setState({alarms});
    });
  }

  render() {
    return (
      <div>
        <UI.Grid columns={2}>
          {
            this.state.alarms.map((alarmInfo, index) =>
              <AlarmListItem key={alarmInfo.name} alarmInfo={alarmInfo} key={index}/>
            )
          }
        </UI.Grid>
        <Link to="/alarms/new">
          <UI.Button fluid basic>
            <UI.Icon name="plus" />
          </UI.Button>
        </Link>
      </div>
    );
  }
}

export default AlarmsPage;

