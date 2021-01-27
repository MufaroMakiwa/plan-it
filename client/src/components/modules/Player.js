import React, { Component } from "react";
import Rocket_1 from "../../public/Player_Rocket_1.png";
import Rocket_2 from "../../public/Player_Rocket_2.png";
import Rocket_3 from "../../public/Player_Rocket_3.png";
import Rocket_4 from "../../public/Player_Rocket_4.png";
import Rocket_5 from "../../public/Player_Rocket_5.png";
import Rocket_6 from "../../public/Player_Rocket_6.png";

import "../../utilities.css";
import "./Player.css";

class Player extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  getPlayerSkin = () => {
    if ( this.props.skin === 1 ) { return Rocket_1 }
    else if ( this.props.skin === 2 ) { return Rocket_2 }
    else if ( this.props.skin === 3 ) { return Rocket_3 }
    else if ( this.props.skin === 4 ) { return Rocket_4 }
    else if ( this.props.skin === 5 ) { return Rocket_5 }
    else if ( this.props.skin === 6 ) { return Rocket_6 }
    else { return Rocket_1 }
  }

  render() {
    return (
      <img id="Player" src={this.getPlayerSkin()} className="Player-player" alt="Your Player"/>
    );
  }
}

export default Player;
