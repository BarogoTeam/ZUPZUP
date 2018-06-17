import React from 'react';
import * as UI from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {CINEMAS} from '../../Constants';
import CinemaModal from './CinemaModal';

const PeopleCountModal = () => (
  <UI.Modal trigger={<UI.Button color="teal" fluid circular>인원수 선택</UI.Button>}>
    <UI.Modal.Header>Select a Photo</UI.Modal.Header>
    <UI.Modal.Content>
      <UI.Modal.Description>
        <UI.Modal.Header>인원수 선택</UI.Modal.Header>
      </UI.Modal.Description>
    </UI.Modal.Content>
    <UI.Modal.Actions>
      <UI.Button color='green'>
        <UI.Icon name='checkmark' /> Got it
      </UI.Button>
    </UI.Modal.Actions>
  </UI.Modal>
)

class NewAlarmPage extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      peopleCount: null,
      date: null,
      cinemaCodes: [],
      seats: {},
    }
  }

  handleCinemaChanged = (cinemaCodes) => {
    this.setState({
      cinemaCodes,
    })
  }

  render() {
    const cinemas = _.filter(CINEMAS, cinema => _.find(this.state.cinemaCodes, code => code === cinema.code))
    return (
      <UI.Container>
        <UI.Grid padded>
          <UI.Grid.Row>
            <PeopleCountModal />
          </UI.Grid.Row>
          <UI.Grid.Row>
            <UI.Button color="teal" fluid circular>날짜 선택</UI.Button>
          </UI.Grid.Row>
          <UI.Grid.Row>
            <CinemaModal
              onCinemaChanged={this.handleCinemaChanged}
              cinemas={cinemas}
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

