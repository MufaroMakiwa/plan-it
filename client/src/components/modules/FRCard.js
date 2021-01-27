import React, { Component } from 'react';
import {get, post} from '../../utilities.js';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import "./FRCard.css";



class FRCard extends Component {
  constructor(props) {
    super(props);  
  }

  accept = () => {
    post("/api/friend/accept", {friendId: this.props.friendId}).then(friend => {
      this.props.onAccept();
    })
  }

  decline = () => {
    post("/api/friend/request/decline", {friendId: this.props.friendId}).then((friend) => {
      this.props.onDecline();
    })
  }

  render() { 
    return ( 
      <div className="FRCard-container">
        <div className="FRCard-detailsContainer">
          <div className="FRCard-iconBigger"> 
            <AccountCircleIcon style={{fontSize: 50}}/>
          </div>

          <div className="FRCard-iconSmaller"> 
            <AccountCircleIcon style={{fontSize: 40}}/>
          </div>

          <div className="FRCard-details">
            <span className="FRCard-name">{this.props.friendName}</span>
            <span className="FRCard-email">{this.props.friendEmail}</span>
          </div>
        </div>   

        <div className="FRCard-buttonsContainer">

          <button 
            className="FRCard-button FRCard-buttonCancel"
            onClick={this.decline}>
            Decline
          </button>
        
          <button 
            className="FRCard-button FRCard-buttonAction"
            onClick={this.accept}>
            Accept
          </button>
        </div>   
      </div>
     );
  }
}
 
export default FRCard;
