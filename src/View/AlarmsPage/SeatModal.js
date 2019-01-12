import React from 'react';
import * as UI from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Konva from 'konva';

export default class SeatModal extends React.PureComponent {
  static propTypes = {
    selectedScreens:PropTypes.arrayOf(PropTypes.object),
    selectedSeats: PropTypes.arrayOf(PropTypes.object),
    onSeatsChanged: PropTypes.func,
  }
  static defaultProps = {
    selectedScreens: null,
    selectedSeats: null,
    onSeatsChanged: () => {},
  }


  constructor() {
    super()
    this.state = {
      selectedScreens: null,
      selectedSeats: null,
    }
  }

  handleOpen = () => {
    this.setState({
      selectedScreens: this.props.selectedScreens,
      selectedRegion: null
    })
  }

  handleActionClick = () => {
    this.props.onSeatsChanged(this.state.selectedSeats)
  }

  handleSeatSelected = (selectedSeats) => {
    this.setState({
      selectedSeats
    })
  }
  
  getSeatLayouts = () => {
    this.state.selectedScreens
    console.log('김준혁때매 망함');
  }

  renderTriggerButton() {
    return (
      <UI.Button color="teal" fluid circular>
        {_.isEmpty(this.state.selectedSeats) ? "좌석 선택" : this.state.selectedSeats.length + "개 좌석"}
      </UI.Button>
    )
  }

  render(){
    console.log("@@@", this.state.selectedScreens)
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
        content={<SeatContent onSeatSelected={this.handleSeatSelected}/>}
        onOpen={this.handleOpen}
        onActionClick={this.handleActionClick}
      />
    )
  }
}

class SeatContent extends React.Component {
  constructor() {
    super();
    this.state = {
      clientWidth: 1,
      selectedSeats: null
    }
    this.ref = React.createRef();
  }

  static propTypes = {
    onSeatsChanged: PropTypes.func,
  }

  static defaultProps = {
    selectedSeats: null,
    onSeatsChanged: () => {},
  }

  shouldComponentUpdate() {
    return this.state.selectedSeats === null;
  }

  componentDidMount() {
    const { clientWidth } = this.ref.current;
    this.setState({
      clientWidth,
      selectedSeats: []
    })
  }

  ButtonActionClick = (vector) => {
    if(vector)  this.drawKonva(this.ref.current,require('./seatInfoExample.json'));
    else  this.drawKonva(this.ref.current,require('./seatInfoExample2.json'));
  }

  render() {
    return (
      <UI.Form>
        <UI.Segment basic>
          <UI.Grid columns={3}>
            <UI.Grid.Column verticalAlign="middle" width={2}>
              <UI.Button icon='angle left' floated='left' onClick={() => {this.ButtonActionClick(false);}} />
            </UI.Grid.Column>
            <UI.Grid.Column width={12}>
              <div ref={this.ref}>
                <div ref={ref => this.drawKonva(ref,require('./seatInfoExample.json'))} />
              </div>
            </UI.Grid.Column>
            <UI.Grid.Column verticalAlign="middle" width={2}>
              <UI.Button icon='angle right' floated='right' onClick={() => {this.ButtonActionClick(true);}} />
            </UI.Grid.Column>
          </UI.Grid>
        </UI.Segment>
      </UI.Form>
    );
  }

  drawKonva(container,seatInfo) {
    if (!container || this.state.clientWidth === 1) return;
    let cursorEventFlag;
    let cursorRect = null;
    let seatRectList;
    let maxx = 0, maxy = 0, minx = 999999, miny = 999999;
    let seatList = seatInfo.Items;

    for(let seat of seatList){
      if(maxx < seat.SeatXCoordinate)  maxx = seat.SeatXCoordinate;
      if(maxy < seat.SeatYCoordinate)  maxy = seat.SeatYCoordinate;
      if(minx > seat.SeatXCoordinate)  minx = seat.SeatXCoordinate;
      if(miny > seat.SeatYCoordinate)  miny = seat.SeatYCoordinate;
    }
    let correction = maxx / this.state.clientWidth * 1.3;

    let stage = new Konva.Stage({
      container: container,
      width: (maxx - minx + seatList[0].SeatXLength) / correction + 100,
      height: (maxy - miny + seatList[0].SeatYLength)  / correction + 100
    });

    let layer = new Konva.Layer();

    layer.add(new Konva.Rect({
      x: 50,
      y: 10,
      width: (maxx - minx + seatList[0].SeatXLength) / correction,
      height: seatList[0].SeatYLength / correction,
      fill: 'black',
      stroke: 'black'}));

    seatRectList = [];
    for(let i=0;i<seatList.length;i++){
      seatList[i].SeatXLength /= correction;
      seatList[i].SeatYLength /= correction;
      seatList[i].SeatXCoordinate = (seatList[i].SeatXCoordinate - minx) / correction + 50;
      seatList[i].SeatYCoordinate = (seatList[i].SeatYCoordinate - miny) / correction + seatList[0].SeatYLength * 2;
      seatRectList.push(new Konva.Rect({
        x: seatList[i].SeatXCoordinate,
        y: seatList[i].SeatYCoordinate,
        width: seatList[i].SeatXLength,
        height:seatList[i].SeatYLength,
        SeatNo: seatList[i].SeatNo,
        Selected: false,
        fill: 'white',
        stroke: seatList[i].Selected ? 'red' : 'black',
        strokeWidth: 2}));
      layer.add(seatRectList[i]);
    }

    let drawStart = (drawX,drawY) => {
      if(cursorRect != null)  cursorRect.destroy();
      cursorEventFlag = true;
      cursorRect = new Konva.Rect({
        x: drawX,
        y: drawY,
        width: 1,
        height:1,
        stroke: 'red',
        strokeWidth: 2,
      });
      layer.add(cursorRect);
      stage.draw();
    }

    let drawMove = (drawX,drawY) => {
      if(cursorEventFlag){
        cursorRect.attrs.width = drawX - cursorRect.attrs.x;
        cursorRect.attrs.height = drawY - cursorRect.attrs.y;
        stage.draw();
      }
    }

    let drawEnd = () => {
      if(cursorRect != null){
        let selectRect = cursorRect.attrs;
        if(selectRect.width < 0) {
          selectRect.x += selectRect.width;
          selectRect.width *= -1;
        }

        if(selectRect.height < 0) {
          selectRect.y += selectRect.height;
          selectRect.height *= -1;
        }

        for(let i=0;i<seatRectList.length;i++){
          let seatRect = seatRectList[i].attrs;
          if(selectRect.x <= seatRect.x && selectRect.y <= seatRect.y && (selectRect.x+selectRect.width) >= (seatRect.x+seatRect.width) && (selectRect.y+selectRect.height) >= (seatRect.y+seatRect.height)){
            seatRectList[i].attrs.fill = 'red';
            seatRectList[i].Selected = true;
          }
          else{
            seatRectList[i].attrs.fill = 'white';
            seatRectList[i].Selected = false;
          }
        }
        cursorRect.destroy();
      }
      cursorEventFlag = false;
      stage.draw();

      this.props.onSeatSelected(seatRectList.filter((seatRect) => {return seatRect.Selected}));
    }

    stage.on('mousedown', (e) => {drawStart(e.evt.layerX,e.evt.layerY);});
    stage.on('mousemove', (e) => {drawMove(e.evt.layerX,e.evt.layerY);});
    stage.on('mouseup', (e) => {drawEnd()});
    stage.on('touchstart', (e) => {drawStart(e.currentTarget.pointerPos.x,e.currentTarget.pointerPos.y);});
    stage.on('touchmove', (e) => {drawMove(e.currentTarget.pointerPos.x,e.currentTarget.pointerPos.y);});
    stage.on('touchend', (e) => {drawEnd()});

    stage.add(layer);
  }
}
