import React from 'react';
import * as UI from 'semantic-ui-react';
import _ from 'lodash';

import { CINEMAS, BACKEND_URL } from '../../Constants';
import CinemaModal from './CinemaModal';

const PeopleCountModal = (props) => (
  <UI.Modal trigger={<UI.Button color="teal" fluid circular>인원수 선택</UI.Button>}>
    <UI.Modal.Header>Select a Photo</UI.Modal.Header>
    <UI.Modal.Content>
      <UI.Input
        label={{basic: true, content: '명'}}
        labelPosition='right'
      />
    </UI.Modal.Content>
    <UI.Modal.Actions>
      <UI.Button color='green' onClick={() => {
        props.onPeopleCountChange("TODO.. 어떻게 넘겨줘야 효과적일까?")
      }}>
        <UI.Icon name='checkmark'/> Got it
      </UI.Button>
    </UI.Modal.Actions>
  </UI.Modal>
);

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
      return cinemas.filter((cinema) => {
        return cinema.regionName
      }).map((cinema) => {
        return {
          code: cinema.cinemaid,
          region: cinema.regionName,
          name: cinema.cinemaName
        }
      });
    }).catch(() => {
      // TODO(재연): CINEMAS 는 삭제될 예정이므로 적절한 Catch문으로 수정필요)
      return CINEMAS;
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
            />
          </UI.Grid.Row>
          <UI.Grid.Row>
            <UI.Button color="teal" fluid circular>날짜 선택</UI.Button>
          </UI.Grid.Row>
          <UI.Grid.Row>
            <CinemaModal
              onCinemaChanged={this.handleCinemaChanged}
              selectedCinemas={selectedCinemas}
              cinemas={this.state.cinemas}
            />
          </UI.Grid.Row>
          <UI.Grid.Row>
            <UI.Button color="teal" fluid circular>좌석 선택</UI.Button>
          </UI.Grid.Row>
        </UI.Grid>
      </UI.Container>
    );
  }
}

export default NewAlarmPage;

