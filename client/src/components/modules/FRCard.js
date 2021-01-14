import React, { Component } from 'react';
import "./Card.css";


class FRCard extends Component {
  constructor(props) {
    super(props);  
  }

  render() { 
    return ( 
      <div className="card-container">

        <p className="card-title">{this.props.name}</p>
        <button onClick={this.props.onAccept} className ="accept-button" type="button"> Accept </button>
        <button onClick={this.props.onDecline} className ="decline-button" type="button"> Decline </button>
         
      </div>
     );
  }
}
 
export default FRCard;
