import React from 'react';
import * as UI from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

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
);

CinemaListItem.propTypes = {
  active: PropTypes.bool,
  children : PropTypes.node
};

export default class CinemaModal extends React.PureComponent {
  static propTypes = {
    cinemas: PropTypes.arrayOf(PropTypes.object).isRequired,
    onCinemaChanged: PropTypes.func,
  };

  static defaultProps = {
    onCinemaChanged: () => {},
  };

  constructor() {
    super();
    this.state = {
      selectedRegion: null,
      selectedCinemas: [],
    }
  }

  handleOpen = () => {
    this.setState({
      selectedRegion: null
    })
  };

  handleActionClick = () => {
    this.props.onCinemaChanged(this.state.selectedCinemas)
  };

  handleRegionClick = (region) => {
    this.setState({
      selectedRegion: region
    })
  };

  getSelectedCinemas = (cinema) => {
    if(!this.state.selectedCinemas.includes(cinema)) {
      return this.state.selectedCinemas.concat([cinema]);
    }

    return this.state.selectedCinemas.filter((selectedCinema) => {
      return selectedCinema !== cinema;
    })
  };

  handleCinemaClick = (cinema) => {
    let selectedCinemas = this.getSelectedCinemas(cinema);

    this.setState({
      selectedCinemas
    })
  };

  renderTriggerButton() {
    return (
      <UI.Button color="teal" fluid circular>
        {_.isEmpty(this.props.selectedCinemas) ? "영화관 선택" : _.map(this.props.selectedCinemas, "name").join("/")}
      </UI.Button>
    )
  }

  renderContent() {
    const regions = _.uniqBy(_.map(this.props.cinemas, 'region'));
    const filteredCinemas = _.filter(this.props.cinemas, cinema=>cinema.region===this.state.selectedRegion)

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
                  active={this.state.selectedCinemas.includes(cinema)}
                  key={cinema.code}
                  onClick={() => {this.handleCinemaClick(cinema)}}>
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
        header="영화관 선택"
        actions={[
          <UI.Button key='gotit' color='green'>
            <UI.Icon name='checkmark' /> 완료
          </UI.Button>
        ]}
        content={this.renderContent()}
        onOpen={this.handleOpen}
        onActionClick={this.handleActionClick}
      />
    )
  }
}
