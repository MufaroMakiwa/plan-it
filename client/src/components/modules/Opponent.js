import React, { Component } from "react";
import Opp_Icon from "../../public/Opponent_Rocket.png";

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
      <>
        <img id="CPU" src={Opp_Icon} className="Opponent-player" alt="Opponent Player"/>
      </>
    );
  }
}

export default Opponent;
