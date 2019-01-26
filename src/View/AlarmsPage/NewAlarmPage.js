import React from 'react';
import * as UI from 'semantic-ui-react';
import _ from 'lodash';

import CinemaModal from './CinemaModal';
import SeatModal from './SeatModal';
import DateModal from "./DateModal";
import PeopleCountModal from "./PeopleCountModal"
import AlarmService from '../../Service/AlarmService';
import Screens from './Screens';

class NewAlarmPage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      peopleCount: null,
      date: null,
      selectedCinemas: [],
      seats: [],
      loaded: false,
      cinemas: [],
      selectedScreens:[
        {
          cinemaName: '광명(광명사거리)',
          screenNameKr: '3관',
          screenId: '302703',
          cinemaId: '3027',
          alarmDate: '2019-01-12'
        },
        {
          cinemaName: '광명(광명사거리)',
          screenNameKr: '5관',
          screenId: '302705',
          cinemaId: '3027',
          alarmDate: '2019-01-12'
        }
      ]
    }
  }

  componentDidMount() {
    AlarmService.getCinemas().then((cinemas) => {
      return _.filter(cinemas, (cinema) => {
        return cinema.regionName
      }).map((cinema) => ({
        code: cinema.cinemaId,
        region: cinema.regionName,
        name: cinema.cinemaName,
        divisionCode: cinema.divisionCode,
        detailDivisionCode: cinema.detailDivisionCode,
      }))
    }).then((cinemas) => {
      this.setState({
        cinemas
      });
      this.handleLoaded(true);
    }).catch((e) => {
      console.error('010-4486-3511');
      alert('서버 오류입니다. 서비스 데스크로 문의해주세요.\n연락처: 010-4486-3511');
    })
  }

  handleCinemaChanged = (selectedCinemas) => {
    this.setState({
      selectedCinemas
    })
  };

  handlePeopleCountChanged = (peopleCount) => {
    this.setState({
      peopleCount
    })
  };

  handleAlarmDateChanged = (selectedDay) => {
    this.setState({
      selectedDay
    })
  };

  handleLoaded = (loaded) => {
    this.setState({
      loaded
    })
  };

  handleSeatsSelected = (seats) => {
    this.setState({
      seats
    })
  };

  postAlarm = () => {
    console.log("start post...");
  };

  render() {
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
              selectedCinemas={this.state.selectedCinemas}
              cinemas={this.state.cinemas}
            />
          </UI.Grid.Row>
          <UI.Grid.Row>
            {this.state.selectedDay && !_.isEmpty(this.state.selectedCinemas) && 
              <Screens
                key={`${this.state.selectedDay.format('YYYY-MM-DD')},${this.state.selectedCinemas.join(',')}`}
                alarmDate={this.state.selectedDay}
                cinemas={this.state.selectedCinemas}
              />
            }
          </UI.Grid.Row>
          <UI.Grid.Row>
            <SeatModal
              selectedScreens={this.state.selectedScreens}
              onSeatsSelected={this.handleSeatsSelected}
            />
          </UI.Grid.Row>
          <UI.Grid.Row>
            <UI.Button color="yellow" fluid circular
               onClick={() => {this.postAlarm()}}>
              <UI.Icon name='checkmark' /> 저장
            </UI.Button>
          </UI.Grid.Row>
        </UI.Grid>
      </UI.Container>
    );
  }
}

export default NewAlarmPage;

