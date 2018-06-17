import React from 'react';
import * as UI from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {CINEMAS} from '../../Constants';


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

export default class CinemaModal extends React.PureComponent {
  static propTypes = {
    cinemas: PropTypes.arrayOf(PropTypes.object).isRequired,
    onCinemaChanged: PropTypes.func,
  }
  static defaultProps = {
    onCinemaChanged: () => {},
  }

  constructor() {
    super()
    this.state = {
      selectedRegion: null,
      selectedCinema: null,
    }
  }

  onOpen = () => {
    this.setState({
      selectedRegion: null,
      selectedCinema: null,
    })
  }

  onActionClick = () => {
    // TODO(재연): 영화관 여러개 받을 수 있도록 수정필요
    this.props.onCinemaChanged([this.state.selectedCinema])
  }

  handleRegionClick = (region) => {
    this.setState({
      selectedRegion: region,
      selectedCinema: null,
    })
  }

  handleCinemaClick = (cinemaCode) => {
    this.setState({
      selectedCinema: cinemaCode,
    })
  }

  renderTriggerButton() {
    return (
      <UI.Button color="teal" fluid circular>
        {_.isEmpty(this.props.cinemas) ? "상영관 선택" : _.map(this.props.cinemas, "name").join("/")}
      </UI.Button>
    )
  }

  renderContent() {
    const regions = _.uniqBy(_.map(CINEMAS, 'region'));
    const filteredCinemas = _.filter(CINEMAS, cinema=>cinema.region===this.state.selectedRegion)

    return (
      <UI.Modal.Content>
        <UI.Modal.Description>
          <UI.List selection>
            <UI.List.Header> 지역 </UI.List.Header>
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
              <UI.List.Header> 영화관 </UI.List.Header>
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
    )
  }

  render(){
    return (
      <UI.Modal
        trigger={this.renderTriggerButton()}
        header="상영관 선택"
        actions={[
          <UI.Button key='gotit' color='green' disabled={!this.state.selectedCinema}>
            <UI.Icon name='checkmark' /> 완료
          </UI.Button>
        ]}
        content={this.renderContent()}
        onOpen={this.onOpen}
        onActionClick={this.onActionClick}
      />
    )
  }
}
