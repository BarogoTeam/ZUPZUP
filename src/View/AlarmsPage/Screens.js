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

  onClick(movieId, movieNameKr, screenNameKr, startTime, endTime, screenId, cinemaId, playSequence, isSelected) {
    this.props.onScreenChanged(movieId, movieNameKr, screenNameKr, startTime, endTime, screenId, cinemaId, playSequence, isSelected);
  
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
            {screen.map(sequence => (
              <UI.Label as='a' key={sequence.playSequence} onClick={() => {this.props.movieCode, this.onClick(movie.movieNameKr, screen[0].screenNameKr, sequence.startTime, sequence.endTime, screen[0].screenId, this.props.cinemaId, sequence.playSequence, true)}}>
                {sequence.startTime}
                
                <UI.LabelDetail content={sequence.endTime}/>
              </UI.Label>
            ))}
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
      cinemaMovieScreens: []
    }
  }

  componentDidMount() {
    AlarmService.getScreens(this.props.cinemas, this.props.alarmDate).then((screens) => {
      return screens.map((screen) => {
        return {
          ...screen,
          cinemaId: `${screen.screenId}`.substring(0, 4),
        }
      })
    }).then((screens) => {
      this.setState({
        cinemaMovieScreens: _.mapValues(_.groupBy(screens, 'cinemaId'), screens => _.mapValues(_.groupBy(screens, 'movieCode'), screens => _.groupBy(screens, 'screenId')))
      });


    }).catch((e) => {
      console.error('010-4486-3511');
      alert('서버 오류입니다. 서비스 데스크로 문의해주세요.\n연락처: 010-4486-3511\n' + JSON.stringify(e));
    })

  }

  render() {
    const { cinemaMovieScreens } = this.state;
    const { cinemas } = this.props;

    return (
      <UI.Item.Group divided>
        {_.map(cinemaMovieScreens, (movieScreens, cinemaId) => (
          <UI.Item key={cinemaId}>
            <UI.Item.Header content={_.find(cinemas, ['code', _.toNumber(cinemaId)]).name} />
            <UI.Item.Content>
              {_.map(movieScreens, (screens, movieCode) => (
                <MovieScreens key={movieCode} movieCode={movieCode} screens={screens} cinemaId = {cinemaId} onScreenChanged={this.props.onScreenChanged}/>
              ))}
            </UI.Item.Content>
          </UI.Item>
        ))}
      </UI.Item.Group>
    );
  }
}
