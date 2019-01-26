import React from 'react';
import * as UI from 'semantic-ui-react';
import {Link} from "react-router-dom";
import AlarmListItem from '../../Component/AlarmListItem/AlarmListItem';
import AlarmService from "../../Service/AlarmService";
const alarms_temp = [
  {
    img: "http://caching.lottecinema.co.kr//Media/MovieFile/MovieImg/201901/13681_201_1.jpg",
    name: "모마이",
    cinemaNames: ["가산디지털단지", "용아맥", "롯데월드점"],
    cinemaTypes: ["IMAX"],
    startTime: "18:00",
    endTime: "20:00",
    date: "2019-01-21",
    weekDays: [1, 5, 6],
    reservationNumber: 1,
    isRun: true
  },{
    img: "http://caching.lottecinema.co.kr//Media/MovieFile/MovieImg/201901/12956_201_1.jpg",
    name: "드래곤 길들이기 3",
    cinemaNames: ["가산디지털단지", "용아맥", "롯데월드점"],
    cinemaTypes: ["2D", "4DX"],
    startTime: "18:00",
    endTime: "20:00",
    date: "2019-01-21",
    weekDays: [2, 3, 4],
    reservationNumber: 6,
    isRun: true
  },{
    img: "http://caching.lottecinema.co.kr//Media/MovieFile/MovieImg/201812/13438_203_1.jpg",
    name: "아쿠아맨",
    cinemaNames: ["롯데월드점"],
    cinemaTypes: ["3D"],
    startTime: "22:00",
    endTime: "23:59",
    date: "2019-01-21",
    weekDays: [1, 5],
    reservationNumber: 2,
    isRun: false
  }
]


class AlarmsPage extends React.PureComponent {



  constructor() {
    super();
    this.state = { alarms: [] };
    console.log('hello');
    AlarmService.getAlarms('ZupzupCrawler@zupzup.com')
      .then( (alarms)=> {
        if (alarms.size() == 0)
          this.setState(alarms);
        else
          this.setState(alarms_temp);
      });  //userkey 하드코딩 박아놓음 TODO 텔레그램방 번호로 수정필요 by thesun.kim
  }

  componentDidMount() {

  }

  render() {
    const alarms = this.state.alarms;
    return (
      <div>
        <UI.Grid columns={2}>
          {
            alarms.map((alarmInfo) =>
              <AlarmListItem key={alarmInfo.name} alarmInfo={alarmInfo} />
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

