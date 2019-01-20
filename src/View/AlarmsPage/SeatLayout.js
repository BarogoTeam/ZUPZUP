import React from "react";
import PropTypes from "prop-types";
import {Stage, Layer, Rect} from "react-konva";

export default class SeatLayout extends React.Component {
  static propTypes = {
    onSeatsChanged: PropTypes.func,
    screenLayouts: PropTypes.arrayOf(PropTypes.object)
  };

  static defaultProps = {
    selectedSeats: null,
    screenLayouts: null,
  };

  constructor() {
    super();
    this.state = {
      selectedSeats: null,
      cursorEventFlag: false,
      cursorRectX: null,
      cursorRectY: null,
      cursorRectWidth: null,
      cursorRectHeight: null
    }

    // this.ref = React.createRef(); {current: null} 로 나옴 계속
  }

  componentDidMount() {
    let selectedSeats = this.props.screenLayouts.map(() => false);
    this.setState({
      selectedSeats: selectedSeats,
      cursorEventFlag: false,
    })
  }

  render() {
    let seatRectList;
    let maxx = 0, maxy = 0, minx = 999999, miny = 999999;
    let seatList = this.props.screenLayouts;

    for(let seat of seatList){
      if(maxx < seat.seatXCoordinate)  maxx = seat.seatXCoordinate;
      if(maxy < seat.seatYCoordinate)  maxy = seat.seatYCoordinate;
      if(minx > seat.seatXCoordinate)  minx = seat.seatXCoordinate;
      if(miny > seat.seatYCoordinate)  miny = seat.seatYCoordinate;
    }
    let correction = maxx / 500 * 1.3;


    seatRectList = seatList.map((seat, index) => {
      return {
        width: seat.seatXLength / correction,
        height: seat.seatYLength / correction,
        x: (seat.seatXCoordinate - minx) / correction + 50,
        y: (seat.seatYCoordinate - miny) / correction + (seat.seatYLength / correction) * 2,
        Selected: this.state.selectedSeats && this.state.selectedSeats[index]
      }
    });

    let cursorRect = (<Rect visible={this.state.cursorEventFlag}
                            x={this.state.cursorRectX}
                            y={this.state.cursorRectY}
                            width={this.state.cursorRectWidth}
                            height={this.state.cursorRectHeight}
                            stroke={'red'}
                            strokeWidth={2} />);

    let handleDrawStart = (e) => {
      this.setState({
        cursorEventFlag: true,
        cursorRectX: e.evt.offsetX,
        cursorRectY: e.evt.offsetY,
        cursorRectWidth: 1,
        cursorRectHeight: 1
      })
    };

    let handleDrawMove = (e) => {
      if(this.state.cursorEventFlag) {
        this.setState({
          cursorRectWidth: e.evt.offsetX - this.state.cursorRectX,
          cursorRectHeight: e.evt.offsetY - this.state.cursorRectY
        })
      }

      let isInside = (outer, inner) => {
        if(outer.x > inner.x) return false;
        if(outer.y > inner.y) return false;
        if(outer.x + outer.width < inner.x + inner.width) return false;
        if(outer.y + outer.height < inner.y + inner.height) return false;

        return true;
      };

      if(this.state.cursorEventFlag) {
        let cursorRect = {
          x: this.state.cursorRectX,
          y: this.state.cursorRectY,
          width: this.state.cursorRectWidth,
          height: this.state.cursorRectHeight,
        };

        if(cursorRect.width < 0) {
          cursorRect.x += cursorRect.width;
          cursorRect.width *= -1;
        }

        if(cursorRect.height < 0) {
          cursorRect.y += cursorRect.height;
          cursorRect.height *= -1;
        }

        this.setState({
          selectedSeats: seatRectList.map((seatRect) => isInside(cursorRect, seatRect))
        });
      }
    };

    let handleDrawEnd = () => {
      this.setState({
        cursorEventFlag: false
      });
      this.props.onSeatsChanged(seatRectList.filter((seatRect) => seatRect.Selected));
    };

    return (<Stage width={(maxx - minx + seatList[0].seatXLength) / correction + 100}
                   height={(maxy - miny + seatList[0].seatYLength)  / correction + 100}
                   onMouseDown={handleDrawStart} onMouseMove={handleDrawMove} onMouseUp={handleDrawEnd}
                   onDragStart={handleDrawStart} onDragMove={handleDrawMove} onDragEnd={handleDrawEnd}>
      <Layer>
        <Rect x={50}
              y={10}
              width={(maxx - minx + seatList[0].seatXLength) / correction}
              height={seatList[0].seatYLength / correction}
              fill={'black'}
              stroke={'black'} />

        {seatRectList.map((seatRect, index) => {
          return (<Rect x={seatRect.x}
                        y={seatRect.y}
                        width={seatRect.width}
                        height={seatRect.height}
                        fill={'white'}
                        stroke={seatRect.Selected ? 'red' : 'black'}
                        strokeWidth={2}
                        key={index} />)

        })}

        {cursorRect}
      </Layer>
    </Stage>)
  }
}
