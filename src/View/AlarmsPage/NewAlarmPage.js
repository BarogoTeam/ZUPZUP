import React from 'react';
import * as UI from 'semantic-ui-react';
import _ from 'lodash';

import CinemaModal from './CinemaModal';
import SeatModal from './SeatModal';
import DateModal from "./DateModal";
import PeopleCountModal from "./PeopleCountModal"
import AlarmService from '../../Service/AlarmService';
import Screens from './Screens';
import {Redirect} from "react-router-dom";

class NewAlarmPage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      peopleCount: null,
      selectedDate: null,
      weekDays: [1, 5, 6],
      selectedCinemas: [],
      seats: [],
      loaded: false,
      cinemas: [],
      selectedMovieId: null,
      selectedScreens:[]
        // {
        //   cinemaName: '광명(광명사거리)',
        //   screenNameKr: '3관',
        //   screenDivisionNameKr: '4D',
        //   screenId: '302703',
        //   cinemaId: '3027',
        //   startTime: "18:00"
        // },
        // {
        //   cinemaName: '광명(광명사거리)',
        //   screenNameKr: '5관',
        //   screenDivisionNameKr: '3D',
        //   screenId: '302705',
        //   cinemaId: '3027',
        //   startTime: "16:00"
        // }
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

  handleAlarmDateChanged = (selectedDate) => {
    this.setState({
      selectedDate
    })
  };

  handleScreenChanged = (movieNameKr, screenNameKr, startTime, endTime, screenId, cinemaId, playSequence, isSelected) => {
    let screen = {
      movieNameKr,
      screenNameKr,
      startTime,
      endTime,
      screenId,
      cinemaId,
      playSequence
    }
    if(isSelected) {
      if(!this.state.selectedScreens.includes(screen)) {
        let selectedScreens = this.state.selectedScreens;
        selectedScreens.push(screen);

        this.setState({
          selectedScreens
        })
      }
    } else {
      let selectedScreens = this.state.selectedScreens.filter((selectedScreen) => {
        return selectedScreen !== screen;
      })
      this.setState({
        selectedScreens 
      })
    }
  }
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
    let body = {
      /*screenId <- selectedScreens.
        screenDivisionCode <- cinemas
        cinemaId <- selectedScreens
        playDate 이미 있고
        playSequence
      */
      movieId: this.state.selectedMovieId,
      date: this.state.selectedDate,
      weekDays: this.state.weekDays,
      reservationNumber: this.state.peopleCount,
      alarms: this.state.selectedScreens.map((cinema, index) => Object.assign({}, cinema, {seatNoList: this.state.seats[index]}))
    };

    AlarmService.postAlarms(body);
  };

  render() {
    return (
      <UI.Container>
        {!localStorage.getItem("token") && <Redirect to="/" />}
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
              selectedDate={this.state.selectedDate} />
          </UI.Grid.Row>
          <UI.Grid.Row>
            <CinemaModal
              onCinemaChanged={this.handleCinemaChanged}
              selectedCinemas={this.state.selectedCinemas}
              cinemas={this.state.cinemas}
            />
          </UI.Grid.Row>
          <UI.Grid.Row>
            {this.state.selectedDate && !_.isEmpty(this.state.selectedCinemas) &&
              <Screens
                key={`${this.state.selectedDate},${this.state.selectedCinemas.join(',')}`}
                alarmDate={this.state.selectedDate}
                cinemas={this.state.selectedCinemas}
                onScreenChanged={this.handleScreenChanged}
              />
            }
          </UI.Grid.Row>
          <UI.Grid.Row>
            <SeatModal
              selectedDate={this.state.selectedDate}
              selectedScreens={this.state.selectedScreens}
              onSeatsSelected={this.handleSeatsSelected}
            />
          </UI.Grid.Row>
          <UI.Grid.Row>
            <UI.Button color="yellow" fluid circular onClick={() => {this.postAlarm()}}>
              <UI.Icon name='checkmark' /> 저장
            </UI.Button>
          </UI.Grid.Row>
        </UI.Grid>
      </UI.Container>
    );
  }
}

export default NewAlarmPage;

