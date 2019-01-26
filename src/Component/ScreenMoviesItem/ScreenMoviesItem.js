import React from 'react';
import * as UI from "semantic-ui-react";
import PropTypes from 'prop-types';

class ScreenMoviesItem extends React.PureComponent {
/*
  static propTypes = {
    movieInfo: PropTypes.object.isRequired,
  }
  state = {isRun: this.props.moveInfo.isRun} // 질문(재연): 이부분 오작동 안하는지 검토부탁해요.
  toggleRunMode = () => this.setState({isRun: !this.state.isRun})
*/
  render() {
    //const weekDays = ['일', '월', '화', '수', '목', '금', '토']; TODO 요일설정은 나중에  by thesun.kim

    return (
      <UI.Grid.Column>
        <UI.Image fluid
                       label={{ as: 'a', color: 'orange', content: '현재 상영작', ribbon: 'right'}}
                       size='large' src={this.props.movieInfo.posterUrl} />
        <UI.Item.Content>
          <UI.Header size='large'><UI.Header.Subheader><br/></UI.Header.Subheader>{this.props.movieInfo.movieNameKr}
          </UI.Header>
          <UI.Item.Extra>            
          </UI.Item.Extra>
        </UI.Item.Content>
      </UI.Grid.Column>
    )
  }
}

export default ScreenMoviesItem;