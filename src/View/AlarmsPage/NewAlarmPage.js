import React from 'react';
import * as UI from 'semantic-ui-react';
import _ from 'lodash';

import { BACKEND_URL } from '../../Constants';
import CinemaModal from './CinemaModal';
import SeatModal from './SeatModal';
import DateModal from "./DateModal";
import PeopleCountModal from "./PeopleCountModal"

class NewAlarmPage extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      peopleCount: null,
      date: null,
      selectedCinemaCodes: [],
      seats: {},
      loaded: false,
      cinemas: []
    }
  }

  componentDidMount() {
    const Header = new Headers();
    Header.append("Content-Type", "application/json");

    const myInit = {
      method: 'GET',
      headers: Header
    };

    fetch(`${BACKEND_URL}/cinemas`, myInit).then((response) => {
      return response.json();
    }).then((cinemas) => {
      return _.filter(cinemas, (cinema) => {
        return cinema.regionName
      }).map((cinema) => {
        return {
          code: cinema.cinemaid,
          region: cinema.regionName,
          name: cinema.cinemaName
        }
      });
    }).then((cinemas) => {
      this.setState({
        cinemas
      });
      this.handleLoaded(true);
    })
  }

  handleCinemaChanged = (selectedCinemaCodes) => {
    this.setState({
      selectedCinemaCodes
    })
  }

  handlePeopleCountChanged = (peopleCount) => {
    this.setState({
      peopleCount
    })
  }

  handleAlarmDateChanged = (selectedDay) => {
    this.setState({
      selectedDay
    })
  }

  handleLoaded = (loaded) => {
    this.setState({
      loaded
    })
  }


  render() {
    const selectedCinemas = _.filter(this.state.cinemas, cinema => _.find(this.state.selectedCinemaCodes, code => code === cinema.code))
    return (
      <UI.Container>
        <UI.Dimmer active={!this.state.loaded}>
          <UI.Loader>Loading</UI.Loader>
        </UI.Dimmer>

        <UI.Grid padded>
          <UI.Grid.Row>
            <PeopleCountModal
              onPeopleCountChange={this.handlePeopleCountChanged}
              peopleCount={this.state.peopleCount}
            />
          </UI.Grid.Row>
          <UI.Grid.Row>
            <DateModal 
              onAlarmDateChanged={this.handleAlarmDateChanged}
              selectedDay={this.state.selectedDay}/>
          </UI.Grid.Row>
          <UI.Grid.Row>
            <CinemaModal
              onCinemaChanged={this.handleCinemaChanged}
              selectedCinemas={selectedCinemas}
              cinemas={this.state.cinemas}
            />
          </UI.Grid.Row>
          <UI.Grid.Row>
            {/*<UI.Button color="teal" fluid circular>좌석 선택</UI.Button>*/}
            <SeatModal
              onScreenChanged={this.handleScreenChanged}
              selectedCinemas={selectedCinemas}
              cinemas={this.state.cinemas}
            />
          </UI.Grid.Row>
        </UI.Grid>
      </UI.Container>
    );
  }
}

export default NewAlarmPage;

