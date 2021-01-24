import { navigate } from '@reach/router';
import React, { Component } from 'react'
import "./RocketTagRoll.css"
import "../../utilities.css";

class RocketTagRoll extends Component {

  openRocketTag = () => {
    navigate("/rocketTag");
  }
  
  render() { 
    return ( 
      <div className="RocketTagRoll-container dummy_div_right">
        <div className="RocketTagRoll-tagBall" onClick={this.openRocketTag}>
        </div>
      </div>
     );
  }
}
 
export default RocketTagRoll;