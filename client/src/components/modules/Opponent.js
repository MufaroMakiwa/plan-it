import React, { Component } from "react";

import "../../utilities.css";
import "./Opponent.css";

class Opponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <div id="CPU" className="Opponent-player">
      </div>
    );
  }
}

export default Opponent;
