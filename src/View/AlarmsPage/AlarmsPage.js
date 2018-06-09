import React, {Component} from 'react';
import * as UI from 'semantic-ui-react';
import AlarmListItem from '../../Component/AlarmListItem/AlarmListItem';

const alarms = [{
    img: "resources/SAMPLE_IMAGE.JPG",
    name: "어벤져스 인피니티워",
    cinemaNames: ["가산디지털단지", "용아맥", "롯데월드점"],
    cinemaTypes: ["2D", "3D", "IMAX"],
    startTime: "18:00",
    endTime: "20:00",
    startDate: "2018-01-21",
    endDate: "2019-01-03",
    weekDays: [1, 5, 6],
    reservationNumber: 1,
    isRun: true
},{
    img: "resources/SAMPLE_IMAGE.JPG",
    name: "데드풀2 번역가 갓",
    cinemaNames: ["가산디지털단지", "용아맥", "롯데월드점"],
    cinemaTypes: ["2D", "3D", "IMAX"],
    startTime: "18:00",
    endTime: "20:00",
    startDate: "2018-05-12",
    endDate: "2018-07-17",
    weekDays: [2, 3, 4],
    reservationNumber: 6,
    isRun: true
},{
    img: "resources/SAMPLE_IMAGE.JPG",
    name: "어벤져스 베리의탄생",
    cinemaNames: ["롯데월드점"],
    cinemaTypes: ["1D"],
    startTime: "22:00",
    endTime: "23:59",
    startDate: "2018-06-14",
    endDate: "2019-08-26",
    weekDays: [1, 5],
    reservationNumber: 2,
    isRun: false
}
]

class AlarmsPage extends Component {
    
  render() {
    return (
      <div>
        <UI.Item.Group divided>
          {
            alarms.map((alarmInfo) =>
              <AlarmListItem key={alarmInfo.id} alarmInfo={alarmInfo} />
            )
          }
        </UI.Item.Group>
        <button class="fluid ui basic button"><i class="plus icon"></i></button>

      </div>
    );
  }
}

export default AlarmsPage;

