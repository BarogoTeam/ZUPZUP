import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Header extends Component {
  // constructor(){
  //   super();
  // }
  // handleKeyDown(e){
  //     const val = this._input.value;
  //     if(!val || e.keyCode !== 13) return;
  //     this.props.handleAddMovie(val);
  //     this._input.value = '';
  // }
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li><Link to="/">App</Link></li>
            <li><Link to="/test">TestListPage</Link></li>
          </ul>
        </nav>
      </header>
      //
      //   <h1 className="movie-app__header">movies</h1>
      //   <input
      //     className="movie-app__new-movie"
      //     placeholder="이곳에 추가할 영화를 입력하세요"
      //     ref={ref=> {this._input = ref; }}
      //     onKeyDown={(e) => this.handleKeyDown(e)}
      //   />
      // </header>
    )
  }
}
export default Header;
