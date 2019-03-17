import React from 'react';
import * as UI from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import AlarmService from "../../Service/AlarmService";
import {ArrayClone, replaceAll} from "../../CommonUtil";
import SeatLayout from "./SeatLayout";

export default class SeatModal extends React.PureComponent {
  static propTypes = {
    selectedDate: PropTypes.string,
    screenInfoList:PropTypes.arrayOf(PropTypes.object),
    onSeatsSelected: PropTypes.func,
  };

  static defaultProps = {
    selectedDate: null,
    screenInfoList: null,
    selectedSeats: null,
  };

  constructor() {
    super();
    this.state = {
      screenInfoList: null,
      selectedSeats: null,
    }
  }

  handleOpen = () => {
    this.setState({
      screenInfoList: this.props.screenInfoList,
      selectedRegion: null,
      selectedSeats: this.props.screenInfoList.map(_ => [])
    })
  };

  handleActionClick = () => {
    let seatNoList = this.state.selectedSeats.map(screen => screen.map(seat => seat.seatNo));
    this.props.onSeatsSelected(seatNoList)
  };

  handleSeatsChanged = (seats, screenPage) => {
    let selectedSeats = ArrayClone(this.state.selectedSeats);
    selectedSeats[screenPage] = seats;
    this.setState({
      selectedSeats
    })
  };

  renderTriggerButton() {
    let text;

    if(_.isEmpty(this.state.selectedSeats)) {
      text = "좌석 선택"
    } else {
      let lengthList = this.state.selectedSeats.map(seat => seat.length);

      text = (replaceAll(lengthList.toString(), ',', ', ')) + " 개 좌석"
    }

    return (
      <UI.Button color="teal" fluid circular>
        {text}
      </UI.Button>
    )
  }

  render(){
    return (
      <UI.Modal
        size="small"
        trigger={this.renderTriggerButton()}
        header="좌석 선택"
        actions={[
          <UI.Button key='gotit' color='green'>
            <UI.Icon name='checkmark' /> 완료
          </UI.Button>
        ]}
        content={<SeatContent onSeatsChanged={this.handleSeatsChanged}
                              selectedDate={this.props.selectedDate}
                              screenInfoList={this.state.screenInfoList}
                              selectedSeats={[null]} />}
        onOpen={this.handleOpen}
        onActionClick={this.handleActionClick}
      />
    )
  }
}

class SeatContent extends React.Component {
  static propTypes = {
    selectedDate: PropTypes.string,
    screenInfoList: PropTypes.arrayOf(PropTypes.object),
    onSeatsChanged: PropTypes.func
  };

  static defaultProps = {
    selectedDate: null,
    selectedSeats: null,
    screenInfoList: [],
  };

  constructor() {
    super();
    this.state = {
      clientWidth: 1,
      selectedSeats: null,
      screenPage: 0,
      loaded: [],
      screenLayouts: []
    };
  }

  shouldComponentUpdate() {
    return this.state.selectedSeats === null;
  }

  componentDidMount() {
    for(let page=0; page < this.props.screenInfoList.length; page++) {
      const {cinemaId, screenId} = this.props.screenInfoList[page];
      AlarmService.getSeats(cinemaId, screenId, this.props.selectedDate).then((response) => {
        const newLoadState = ArrayClone(this.state.loaded);
        const newScreenLayouts = ArrayClone(this.state.screenLayouts);

        newLoadState[page] = true;
        newScreenLayouts[page] = response;

        this.setState({
          loaded: newLoadState,
          screenLayouts: newScreenLayouts
        })
      })
    }
  }

  nextButtonClick() {
    this.setState({
      screenPage: this.state.screenPage === this.props.screenInfoList.length - 1 ? 0 : this.state.screenPage + 1
    })
  }

  prevButtonClick() {
    this.setState({
      screenPage: this.state.screenPage === 0 ? this.props.screenInfoList.length - 1 : this.state.screenPage - 1
    })
  }

  drawSeats() {
    if(this.state.loaded[this.state.screenPage]) {
      return (
        <UI.Segment basic>
          <UI.Grid columns={3}>
            <UI.Grid.Column verticalAlign="middle" width={2}>
              <UI.Button icon='angle left' floated='left' onClick={() => {this.prevButtonClick();}} />
            </UI.Grid.Column>
            <UI.Grid.Column width={12}>
              <SeatLayout screenInfoList={this.props.screenInfoList[this.state.screenPage]}
                          screenLayouts={this.state.screenLayouts}
                          onSeatsChanged={this.props.onSeatsChanged}
                          screenPage={this.state.screenPage} />
            </UI.Grid.Column>
            <UI.Grid.Column verticalAlign="middle" width={2}>
              <UI.Button icon='angle right' floated='right' onClick={() => {this.nextButtonClick();}} />
            </UI.Grid.Column>
          </UI.Grid>
        </UI.Segment>
      )
    } else {
      return (
        <div style={{height: "400px"}}>
          <UI.Dimmer inverted active={true}>
            <UI.Loader>Loading</UI.Loader>
          </UI.Dimmer>
        </div>)
    }
  }

  render() {
    return (
      <UI.Form>
        {this.drawSeats()};
      </UI.Form>
    );
  }
}
