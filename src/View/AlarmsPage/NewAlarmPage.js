import React from 'react';
import * as UI from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const PeopleCountModal = () => (
  <UI.Modal trigger={<UI.Button color="teal" fluid circular>인원수 선택</UI.Button>}>
    <UI.Modal.Header>Select a Photo</UI.Modal.Header>
    <UI.Modal.Content>
      <UI.Modal.Description>
        <UI.Modal.Header>인원수 선택</UI.Modal.Header>
      </UI.Modal.Description>
    </UI.Modal.Content>
    <UI.Modal.Actions>
      <UI.Button color='green' onClick={this.handleClose}>
        <UI.Icon name='checkmark' /> Got it
      </UI.Button>
    </UI.Modal.Actions>
  </UI.Modal>
)

const CinemaListItem = (props) => (
  props.active ? (
    <UI.List.Item {...props} as={UI.Segment} color='teal' inverted>
      {props.children}
    </UI.List.Item>
  ) : (
    <UI.List.Item {...props} >
      {props.children}
    </UI.List.Item>
  )
)
CinemaListItem.propTypes = {
  active: PropTypes.bool,
  children : PropTypes.node,
}

const cinemas = [
  {
    region: '서울',
    name: '건대입구',
    code: '1000',
  },
  {
    region: '서울',
    name: '강변',
    code: '1001',
  },
  {
    region: '제주',
    name: '서귀포',
    code: '2000',
  },
];


class CinemaModal extends React.Component{
  constructor() {
    super()
    this.state = {
      selectedRegion: null,
      selectedCinema: null,
    }
    this.handleRegionClick = this.handleRegionClick.bind(this);
    this.handleRegionClick = this.handleRegionClick.bind(this);

  }

  handleRegionClick(region){
    this.setState({
      selectedRegion: region,
    })
  }

  handleCinemaClick(cinemaCode){
    this.setState({
      selectedCinema: cinemaCode,
    })
  }

  render(){
    const regions = _.uniqBy(_.map(cinemas, 'region'));
    const filteredCinemas = _.filter(cinemas, cinema=>cinema.region===this.state.selectedRegion)

    return (
      <UI.Modal trigger={<UI.Button color="teal" fluid circular>상영관 선택</UI.Button>}>
        <UI.Modal.Header>Select a Photo</UI.Modal.Header>
        <UI.Modal.Content>
          <UI.Modal.Description>
            <UI.List selection>
              {regions.map((region) => (
                <CinemaListItem
                  active={this.state.selectedRegion === region}
                  key={region}
                  onClick={() => {this.handleRegionClick(region)}}>
                  {region}
                </CinemaListItem>
              ))}
            </UI.List>
            {this.state.selectedRegion && (
              <UI.List selection>
                {filteredCinemas.map((cinema)=>(
                  <CinemaListItem
                    active={this.state.selectedCinema === cinema.code}
                    key={cinema.code}
                    onClick={() => {this.handleCinemaClick(cinema.code)}}>
                    {cinema.name}
                  </CinemaListItem>
                ))}
              </UI.List>
            )}
          </UI.Modal.Description>
        </UI.Modal.Content>
        <UI.Modal.Actions>
          <UI.Button color='green' onClick={this.handleClose}>
            <UI.Icon name='checkmark' /> Got it
          </UI.Button>
        </UI.Modal.Actions>
      </UI.Modal>
    )
  }
}

class NewAlarmPage extends React.Component {
  render() {
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
            <CinemaModal />
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

