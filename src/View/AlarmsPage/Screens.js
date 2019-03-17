import React from 'react';
import * as UI from 'semantic-ui-react';
import _ from 'lodash';
import AlarmService from '../../Service/AlarmService';

class MovieScreens extends React.PureComponent {

  constructor() {
    super();
    this.state = { movie: null };
  }

  componentDidMount() {
    AlarmService.getMovie(this.props.movieCode)
      .then(movie => this.setState({ movie }));
  }

  onClick(movieId, movieName, sequenceInfo) {
    this.props.onScreenChanged(movieId, movieName, sequenceInfo);
  }

  render() {
    const { movie } = this.state;
    const { screens } = this.props;

    if (!movie) return <UI.Loader active />;

    return (
      <React.Fragment>
        <UI.Item.Meta content={movie.movieNameKr} />
        {_.map(screens, (screen, screenId) => (
          <UI.Item.Description key={screenId}>
            <UI.Button basic compact size="mini" floated="right" content={screen[0].screenNameKr} />
            {screen.map(sequence => {

              let sequenceInfo = {
                screenName: screen[0].screenNameKr,
                startTime: sequence.startTime,
                endTime: sequence.endTime,
                screenId: screen[0].screenId,
                cinemaId: this.props.cinemaId,
                playSequence: sequence.playSequence,
                isSelected: sequence.isSelected
              };

              return <UI.Label color={sequenceInfo.isSelected ? 'teal' : 'grey'} as='a' key={sequenceInfo.playSequence} onClick={() => {
                this.onClick(this.props.movieCode, movie.movieNameKr, sequenceInfo)
              }}>
                {sequenceInfo.startTime}

                <UI.LabelDetail content={sequenceInfo.endTime} />
              </UI.Label>
            })}
          </UI.Item.Description>
        ))}
      </React.Fragment>
    );
  }
}

export default class Screens extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      screenInfoList: []
    }
  }

  componentDidMount() {

  }

  render() {
    const {screenInfoList} = this.props;
    const {cinemas} = this.props;

    let cinemaMovieScreens = _.mapValues(_.groupBy(screenInfoList, 'cinemaId'), screenInfoList => _.mapValues(_.groupBy(screenInfoList, 'movieCode'), screenInfoList => _.groupBy(screenInfoList, 'screenId')));

    return (
      <UI.Item.Group divided>
        {_.map(cinemaMovieScreens, (movieScreens, cinemaId) => (
          <UI.Item key={cinemaId}>
            <UI.Item.Header content={_.find(cinemas, ['code', _.toNumber(cinemaId)]).name}/>
            <UI.Item.Content>
              {_.map(movieScreens, (screens, movieCode) => (
                <MovieScreens key={movieCode} movieCode={movieCode} screens={screens} cinemaId={cinemaId}
                              onScreenChanged={this.props.onScreenChanged}/>
              ))}
            </UI.Item.Content>
          </UI.Item>
        ))}
      </UI.Item.Group>
    );
  }
}
