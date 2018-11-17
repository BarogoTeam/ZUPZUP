import React from 'react';
import * as UI from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Konva from 'konva';

const SeatInfo = require('./seatInfoExample.json')

export default class SeatModal extends React.PureComponent {
  static propTypes = {
    seats: PropTypes.arrayOf(PropTypes.object).isRequired,
    onScreenChanged: PropTypes.func,
  }
  static defaultProps = {
    onScreenChanged: () => {},
  }


  constructor() {
    super()
    this.state = {
      selectedSeats: [],
    }
  }

  handleOpen = () => {
    this.setState({
      selectedRegion: null
    })
  }

  handleActionClick = () => {
    this.props.onCinemaChanged(this.state.selectedCinemas)
  }


  getSelectedSeats = (isExist, cinemaCode) => {


  }

  renderTriggerButton() {
    return (
      <UI.Button color="teal" fluid circular>
        {_.isEmpty(this.props.selectedSeats) ? "좌석 선택" : "좌석 선택완료"}
      </UI.Button>
    )
  }

  render(){
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
        content={<SeatContent/>}
        onOpen={this.handleOpen}
        onActionClick={this.handleActionClick}
      />
    )
  }
}

class SeatContent extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      clientWidth: 1,
    }
    this.ref = React.createRef();
  }

  componentDidMount() {
    const { clientWidth } = this.ref.current;
    this.setState({
      clientWidth
    })
  }

  drawKonva(container) {
    if (!container || this.state.clientWidth === 1) return;
    let cursorEventFlag;
    let cursorRect = null;
    let seatRect;
    let Seat = SeatInfo.Items;
    let maxx = 0, maxy = 0, minx = 999999, miny = 999999;

    for(let i=0;i<Seat.length;i++){
      if(maxx < Seat[i].SeatXCoordinate)  maxx = Seat[i].SeatXCoordinate;
      if(maxy < Seat[i].SeatYCoordinate)  maxy = Seat[i].SeatYCoordinate;
      if(minx > Seat[i].SeatXCoordinate)  minx = Seat[i].SeatXCoordinate;
      if(miny > Seat[i].SeatYCoordinate)  miny = Seat[i].SeatYCoordinate;
    }
    let correction = maxx / this.state.clientWidth * 1.3;

    let stage = new Konva.Stage({
      container: container,
      width: (maxx - minx + Seat[0].SeatXLength) / correction + 100,
      height: (maxy - miny + Seat[0].SeatYLength)  / correction + 100
    });

    let layer = new Konva.Layer();
    layer.add(new Konva.Rect({
      x: 0,
      y: 0,
      width: (maxx - minx + Seat[0].SeatXLength) / correction + 100,
      height: (maxy - miny + Seat[0].SeatYLength)  / correction + 100,
      stroke: 'black'}));
    layer.add(new Konva.Rect({
      x: 50,
      y: 10,
      width: (maxx - minx + Seat[0].SeatXLength) / correction,
      height: Seat[0].SeatYLength / correction,
      fill: 'black',
      stroke: 'black'}));

    seatRect = [];
    for(let i=0;i<Seat.length;i++){
      Seat[i].SeatXLength /= correction;
      Seat[i].SeatYLength /= correction;
      Seat[i].SeatXCoordinate = (Seat[i].SeatXCoordinate - minx) / correction + 50;
      Seat[i].SeatYCoordinate = (Seat[i].SeatYCoordinate - miny) / correction + Seat[0].SeatYLength * 2;
      seatRect.push(new Konva.Rect({
        x: Seat[i].SeatXCoordinate,
        y: Seat[i].SeatYCoordinate,
        width: Seat[i].SeatXLength,
        height:Seat[i].SeatYLength,
        SeatNo: Seat[i].SeatNo,
        Selected: false,
        fill: 'white',
        stroke: 'black',
        strokeWidth: 2}));
      layer.add(seatRect[i]);
    }

    function drawStart(drawX,drawY){
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

    function drawMove(drawX,drawY){
      if(cursorEventFlag){
        cursorRect.attrs.width = drawX - cursorRect.attrs.x;
        cursorRect.attrs.height = drawY - cursorRect.attrs.y;
        stage.draw();
      }
    }

    function drawEnd(){
      if(cursorRect != null){
        var r = cursorRect.attrs;
        for(var i=0;i<seatRect.length;i++){
          var s = seatRect[i].attrs;
          if(r.x <= s.x && r.y <= s.y && (r.x+r.width) >= (s.x+s.width) && (r.y+r.height) >= (s.y+s.height)){
            seatRect[i].attrs.fill = 'red';
            seatRect[i].Selected = true;
          }
          else{
            seatRect[i].attrs.fill = 'white';
            seatRect[i].Selected = false;
          }
        }
        cursorRect.destroy();
      }
      cursorEventFlag = false;
      stage.draw();
    }

    stage.on('mousedown', (e) => {drawStart(e.evt.layerX,e.evt.layerY);});
    stage.on('mousemove', (e) => {drawMove(e.evt.layerX,e.evt.layerY);});
    stage.on('mouseup', (e) => {drawEnd();});
    stage.on('touchstart', (e) => {drawStart(e.currentTarget.pointerPos.x,e.currentTarget.pointerPos.y);});
    stage.on('touchmove', (e) => {drawMove(e.currentTarget.pointerPos.x,e.currentTarget.pointerPos.y);});
    stage.on('touchend', (e) => {drawEnd();});

    stage.add(layer);
  }

  render() {
    //const {screens} = this.props;
    return (
      <UI.Form>
        <UI.Segment basic>
          <div ref={this.ref}>
            <div ref={ref => this.drawKonva(ref)} />
          </div>
        </UI.Segment>
        <UI.Button icon='angle left' floated='left'/>
        <UI.Button icon='angle right' floated='right'/>
      </UI.Form>
    );
  }
}
