import React, { Component } from 'react';
import "./Card.css";
import {get, post} from '../../utilities.js';


class FRCard extends Component {
  constructor(props) {
    super(props);  
  }

  accept = () => {
    console.log("accept")
  }

  decline = () => {
    console.log("decline")
    post("/api/friend/delete", {friendId: this.props.friendId}).then((friend) => {
      this.props.onDecline();
    })
  }

  render() { 
    return ( 
      <div className="card-container">

        <p className="card-title">{this.props.friendName}</p>
        <button onClick={this.accept} className ="accept-button" type="button"> Accept </button>
        <button onClick={this.decline} className ="decline-button" type="button"> Decline </button>
         
      </div>
     );
  }
}
 
export default FRCard;
