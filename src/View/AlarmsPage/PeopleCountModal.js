import React from 'react';
import * as UI from 'semantic-ui-react';

export default class CinemaModal extends React.PureComponent {

  constructor() {
    super()
    this.state = {
      PeopleCount : '0'
    }
  }

  handleActionClick = () => {
    this.props.onPeopleCountChange(this.state.PeopleCount)
  }

  renderTriggerButton() {
    return (
      <UI.Button color="teal" fluid circular>
        {this.props.peopleCount == null ? "인원수 선택" : this.props.peopleCount + ' 명'}
      </UI.Button>
    )
  }

  renderContent() {
    return (
      <UI.Modal.Content>
        <UI.Input
          label={{basic: true, content: '명'}}
          labelPosition='right'
          onChange={(event, target) => {
            if(target.value >= 1 && target.value < 9){
              this.setState({
                PeopleCount : target.value
              })
            }
            else{
              target.value = '';
            }
          }}
        />
      </UI.Modal.Content>
    )
  }

  render(){
    return (
      <UI.Modal
        trigger={this.renderTriggerButton()}
        header="인원수 선택"
        actions={[
          <UI.Button key='gotit' color='green'>
            <UI.Icon name='checkmark' /> 완료
          </UI.Button>
        ]}
        content={this.renderContent()}
        onActionClick={this.handleActionClick}
      />
    )
  }
}

/*
const PeopleCountModal = (props) => (
  <UI.Modal trigger={<UI.Button color="teal" fluid circular>인원수 선택</UI.Button>}>
    <UI.Modal.Header>인원수 선택</UI.Modal.Header>
    <UI.Modal.Content>
      <UI.Input
        label={{basic: true, content: '명'}}
        labelPosition='right'
      />
    </UI.Modal.Content>
    <UI.Modal.Actions>
      <UI.Button color='green' onClick={() => {
        props.onPeopleCountChange("1명")
      }}>
        <UI.Icon name='checkmark'/> Got it
      </UI.Button>
    </UI.Modal.Actions>
  </UI.Modal>
);
*/

//export default PeopleCountModal;