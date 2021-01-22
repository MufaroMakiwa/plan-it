import React, { Component } from "react";

import "../../utilities.css";
import "./Player.css";

class Player extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <div id="Player" className="Player-player">
      </div>
    );
  }
}

export default Player;
