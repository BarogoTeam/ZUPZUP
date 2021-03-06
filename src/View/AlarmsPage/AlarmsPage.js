import React from 'react';
import * as UI from 'semantic-ui-react';
import {Link, Redirect} from "react-router-dom";
import AlarmListItem from '../../Component/AlarmListItem/AlarmListItem';
import AlarmService from "../../Service/AlarmService";

class AlarmsPage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      alarms: [],
      loaded: null
    };
  }

  componentDidMount() {
    AlarmService.getAlarms().then((alarms)=> {
      this.setState({
        alarms: alarms,
        loaded: true
      });
    });
  }

  render() {
    if(!sessionStorage.getItem("token")) {
      let savedId = localStorage.getItem("chatId");
      return savedId ?
        <Redirect to={"/signin/?chatId=" + savedId} /> :
        <Redirect to={"/signin"} />
    }

    if(!this.state.loaded) {
      return (
        <div style={{height: "400px"}}>
          <UI.Dimmer inverted active={true}>
            <UI.Loader>Loading</UI.Loader>
          </UI.Dimmer>
        </div>
      )
    }

    return (
      <div>
        <UI.Grid columns={2}>
          {
            this.state.alarms.map((alarmInfo) =>
              <AlarmListItem key={alarmInfo._id} alarmInfo={alarmInfo} />
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

