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
      isAlarmPosted: false,
      peopleCount: null,
      selectedDate: null,
      weekDays: [1, 5, 6],
      selectedCinemas: [],
      seats: [],
      loaded: false,
      cinemas: [],
      movieId: null,
      movieNameKr: null,
      screenInfoList:[]
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
    });

    if(this.state.selectedDate !== null) {
      this.updateMovieScreens(selectedCinemas, this.state.selectedDate);
    }
  };

  handlePeopleCountChanged = (peopleCount) => {
    this.setState({
      peopleCount
    })
  };

  handleAlarmDateChanged = (selectedDate) => {
    this.setState({
      selectedDate
    });

    if(this.state.selectedCinemas.length !== 0) {
      this.updateMovieScreens(this.state.selectedCinemas, selectedDate);
    }
  };

  updateMovieScreens = (selectedCinemas, selectedDate) => {
    AlarmService.getScreens(selectedCinemas, selectedDate).then((screens) => {
      return screens.map((screen) => {
        return {
          ...screen,
          cinemaId: `${screen.screenId}`.substring(0, 4),
        }
      })
    }).then((screens) => {
      this.setState({
        screenInfoList: screens
      });

    }).catch((e) => {
      console.error('010-4486-3511');
      alert('서버 오류입니다. 서비스 데스크로 문의해주세요.\n연락처: 010-4486-3511\n' + JSON.stringify(e));
    })
  };

  handleScreenChanged = (movieId, movieNameKr, sequenceInfo) => {
    let newScreenInfoList = this.state.screenInfoList.map((screenInfo) => {
      if(screenInfo.screenId === sequenceInfo.screenId
        && screenInfo.cinemaId === sequenceInfo.cinemaId
        && screenInfo.playSequence === sequenceInfo.playSequence) {

        screenInfo.isSelected = !screenInfo.isSelected;
      }

      return screenInfo;
    })
    
    let selectedScreenInfo = newScreenInfoList.find((screenInfo)=>{return screenInfo.isSelected});
    movieId = selectedScreenInfo ? movieId : null;
    movieNameKr =  movieId ? movieNameKr : null;
    
    this.setState({
      movieId,
      movieNameKr,
      screenInfoList: newScreenInfoList
    })
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

  postAlarm = (alarm) => {
    AlarmService.postAlarms(alarm).then(() => {
      console.log("Complete!");
      this.setState({
        isAlarmPosted: true
      })
    });
  };

  validateAlarm(alarm) {
    if(!alarm.movieId) return Promise.reject("alarm.movieId");
    if(!alarm.movieNameKr) return Promise.reject("alarm.movieNameKr");
    if(!alarm.playDate) return Promise.reject("alarm.playDate");
    if(!alarm.reservationNumber || alarm.reservationNumber === "0") return Promise.reject("alarm.reservationNumber");
    if(!alarm.sequences) return Promise.reject("alarm.sequences");

    for(let sequence of alarm.sequences) {
      if(!sequence.screenNameKr) return Promise.reject("sequence.screenNameKr");
      if(!sequence.startTime) return Promise.reject("sequence.startTime");
      if(!sequence.endTime) return Promise.reject("sequence.endTime");
      if(!sequence.screenId) return Promise.reject("sequence.screenId");
      if(!sequence.cinemaId) return Promise.reject("sequence.cinemaId");
      if(!sequence.screenDivisionNameKr) return Promise.reject("sequence.screenDivisionNameKr");
      if(!sequence.filmNameKr) return Promise.reject("sequence.filmNameKr");
      if(!sequence.playSequence) return Promise.reject("sequence.playSequence");
      if(!sequence.seatNoList) return Promise.reject("sequence.seatNoList");
    }

    return Promise.resolve();
  }

  render() {
    if(this.state.isAlarmPosted) {
      return <Redirect to="/alarms" />
    }
    return (
      <UI.Container>
        {!sessionStorage.getItem("token") && <Redirect to="/" />}
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
                cinemas={this.state.selectedCinemas}
                screenInfoList={this.state.screenInfoList}
                selectedMovieId={this.state.movieId}
                onScreenChanged={this.handleScreenChanged}
              />
            }
          </UI.Grid.Row>
          <UI.Grid.Row>
            <SeatModal
              selectedDate={this.state.selectedDate}
              screenInfoList={this.state.screenInfoList.filter((screenInfo) => {return screenInfo.isSelected})}
              onSeatsSelected={this.handleSeatsSelected}
            />
          </UI.Grid.Row>
          <UI.Grid.Row>
            <UI.Button color="yellow" fluid circular onClick={() => {
              let alarm = {
                movieNameKr: this.state.movieNameKr,
                movieId: this.state.movieId,
                playDate: this.state.selectedDate,
                reservationNumber: this.state.peopleCount,
                sequences: this.state.screenInfoList
                  .filter((screenInfo)=>{return screenInfo.isSelected})
                  .map((cinema, index) => {
                    return {
                      screenNameKr: cinema.screenNameKr,
                      startTime: cinema.startTime,
                      endTime: cinema.endTime,
                      screenId: cinema.screenId,
                      cinemaId: cinema.cinemaId,
                      screenDivisionNameKr: cinema.screenDivisionNameKr,
                      filmNameKr: cinema.filmNameKr,
                      playSequence: cinema.playSequence,
                      seatNoList: this.state.seats[index]
                    }
                  }),
                isRun: true
              };

              this.validateAlarm(alarm).then(() => {
                console.log("Alarm is validated");
                this.postAlarm(alarm)
              }).catch((message) => {
                console.log(message + " is not validated");
              })
            }}>
              <UI.Icon name='checkmark' /> 저장
            </UI.Button>
          </UI.Grid.Row>
        </UI.Grid>
      </UI.Container>
    );
  }
}

export default NewAlarmPage;

