import React, { Component } from "react";
import SideBar from "../modules/SideBar.js";
import GameBoard from "../modules/GameBoard.js";

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
      <div className="RocketTag-Container">
        <SideBar 
          link="/rocketTag"
          userName={this.props.userName}
          handleLogout={this.props.handleLogout}/>

        <div className="RocketTag-Main">
          <h3 className="RocketTag-Header"> Rocket Tag! </h3>
          <GameBoard/>
        </div>
      </div>
    );
  }
}

export default RocketTag;
