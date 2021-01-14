import React, { Component } from 'react';
import "./Card.css";


class CFCard extends Component {
  constructor(props) {
    super(props);  
  }

  render() { 
    return ( 
      <div className="card-container">

        <p className="card-title">{this.props.name}</p>
        <button onClick={this.props.onChallenge} className ="challenge-button" type="button"> Challenge </button>
        <button onClick={this.props.onUnfriend} className ="unfriend-button" type="button"> Unfriend </button>
         
      </div>
     );
  }
}
 
export default CFCard;