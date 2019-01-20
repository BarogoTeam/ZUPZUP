import React from 'react';
import * as UI from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import AlarmService from "../../Service/AlarmService";
import {ArrayClone, replaceAll} from "../../CommonUtil";
import SeatLayout from "./SeatLayout";

export default class SeatModal extends React.PureComponent {
  static propTypes = {
    selectedScreens:PropTypes.arrayOf(PropTypes.object),
    onSeatsSelected: PropTypes.func,
  };

  static defaultProps = {
    selectedScreens: null,
    selectedSeats: null,
  };

  constructor() {
    super();
    this.state = {
      selectedScreens: null,
      selectedSeats: null,
    }
  }

  handleOpen = () => {
    this.setState({
      selectedScreens: this.props.selectedScreens,
      selectedRegion: null,
      selectedSeats: this.props.selectedScreens.map(_ => [])
    })
  };

  handleActionClick = () => {
    this.props.onSeatsSelected(this.state.selectedSeats)
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
                              selectedScreens={this.state.selectedScreens}
                              selectedSeats={[null]} />}
        onOpen={this.handleOpen}
        onActionClick={this.handleActionClick}
      />
    )
  }
}

class SeatContent extends React.Component {
  static propTypes = {
    selectedScreens: PropTypes.arrayOf(PropTypes.object),
    onSeatsChanged: PropTypes.func
  };

  static defaultProps = {
    selectedSeats: null,
    selectedScreens: [],
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
    for(let page=0; page < this.props.selectedScreens.length; page++) {
      const {cinemaId, screenId, alarmDate} = this.props.selectedScreens[page];
      AlarmService.getSeats(cinemaId, screenId, alarmDate).then((response) => {
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
      screenPage: this.state.screenPage === this.props.selectedScreens.length - 1 ? 0 : this.state.screenPage + 1
    })
  }

  prevButtonClick() {
    this.setState({
      screenPage: this.state.screenPage === 0 ? this.props.selectedScreens.length - 1 : this.state.screenPage - 1
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
              <SeatLayout selectedScreens={this.props.selectedScreens[this.state.screenPage]}
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
