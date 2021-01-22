import { navigate } from '@reach/router';
import React, { Component } from 'react'
import "./RocketTagRoll.css"

class RocketTagRoll extends Component {

  openRocketTag = () => {
    navigate("/rocketTag");
  }
  
  render() { 
    return ( 
      <div className="RocketTagRoll-container">
        <div className="RocketTagRoll-tagBall" onClick={this.openRocketTag}>
        </div>
      </div>
     );
  }
}
 
export default RocketTagRoll;