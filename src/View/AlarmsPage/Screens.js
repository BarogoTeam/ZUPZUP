import React from 'react';
import * as UI from 'semantic-ui-react';
import _ from 'lodash';
import AlarmService from '../../Service/AlarmService';

export default class Screens extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      screens: []
    }
  }

  componentDidMount() {
    AlarmService.getScreens(this.props.cinemaCodes, this.props.alarmDate).then((screens) => {
      console.log(screens);
      return screens.map((screen) => {
        return {
          cinemaId: `${screen.screenId}`.substring(0,4),
          screenId: screen.screenId,
          movieCode: screen.movieCode,
          startTime: screen.startTime,
          endTime: screen.endTime,
          totalSeatCount: screen.totalSeatCount,
          bookingSeatCount: screen.bookingSeatCount
        }
      })
    }).then((screens) => {

      console.log(screens);
      this.setState({
        screens
      });

      console.log("done");

    }).catch((e) => {
      console.error('010-4486-3511');
      alert('서버 오류입니다. 서비스 데스크로 문의해주세요.\n연락처: 010-4486-3511\n'+JSON.stringify(e));
    })

  }

  render() {
    return (
      <UI.Item.Group divided>
        <UI.Item>
          {this.state.screens.map((screen   , i) => {
            console.log(`<screenContent cinemaId = ${screen.cinemaId}
                                       screenId = ${screen.screenId}
                                       movieCode = ${screen.movieCode}
                                       startTime = ${screen.startTime}
                                       endTime = ${screen.endTime} key = ${i}/>`)
            return /*(<screenContent cinemaId = {screen.cinemaId}
                                   screenId = {screen.screenId}
                                   movieCode = {screen.movieCode}
                                   startTime = {screen.startTime}
                                   endTime = {screen.endTime} key = {i}/>);*///TODO 로그로 나오는것 출력기능 by 태선
          })}
        </UI.Item>
      </UI.Item.Group>

    );
  }
}

class screenContent extends React.PureComponent {
  render() {
    return (
      <UI.Item.Content>
        <UI.Item.Header as='a'>{this.props.cinemaId}</UI.Item.Header>
        <UI.Item.Meta>
          <span className='cinema'>{this.props.movieCode}</span>
        </UI.Item.Meta>
        <UI.Item.Extra>
          <UI.Label>{this.props.startTime} ~ {this.props.endTime}</UI.Label>
        </UI.Item.Extra>
      </UI.Item.Content>
    );
  }
}