import React, { Component } from "react";
import SideBar from "../modules/SideBar.js";
import GameBoard from "../modules/GameBoard.js";
import NavBar from "../modules/NavBar.js";
import CustomBackground from '../modules/CustomBackground.js';

import "../../utilities.css";
import "./RocketTag.css";

class RocketTag extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <div className="page-container">

        <NavBar 
          link="/rocketTag"
          userName={this.props.userName}
          handleLogout={this.props.handleLogout}/>

        <SideBar
          link="/rocketTag"
          userName={this.props.userName}
          userIcon={this.props.userIcon}
          handleLogout={this.props.handleLogout}/>

        <div className="dummy_div_left"></div>

        <CustomBackground />

        <div className="page_main u-textCenter">
          <div className="tile_box_centered">
            <h3 className="RocketTag-Header"> Rocket Tag! </h3>
            <GameBoard />
          </div>
        </div>
      </div>
    );
  }
}

export default RocketTag;

  // height: 75vh;
  // border-width: 10px;
  // border-style: solid;
  // border-color: #fa5460;
  // background-color: #000318;
  // position: relative;