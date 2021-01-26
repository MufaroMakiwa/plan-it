import React, { Component } from 'react';
import "./FriendRequests.css"
import FRCard from "../modules/FRCard.js";
import "../../utilities.css";
import {get, post} from '../../utilities.js';

class FriendRequests extends Component {
  constructor(props) {
    super(props);
  }

  
  render() { 
    let friendsList = null;
    const hasFriends = this.props.friendRequests.length !== 0;

    if (hasFriends) {
      friendsList = this.props.friendRequests.map((friendObj) => (
        <FRCard
          key={`listItem-${friendObj._id}`}
          friendName={friendObj.userName_1 === this.props.userName ? friendObj.userName_2: friendObj.userName_1}
          friendId={friendObj.userName_1 === this.props.userName ? friendObj.userId_2: friendObj.userId_1}
          onAccept={() => this.props.updateRequests(friendObj.userName_1 === this.props.userName ? friendObj.userId_2: friendObj.userId_1)}
          onDecline={() => this.props.updateRequests(friendObj.userName_1 === this.props.userName ? friendObj.userId_2: friendObj.userId_1)}
        />
      ));
      
    } else {
      friendsList = <div>No Requests!</div>;
    }

    return ( 
        <div className="FriendRequests-container">
          <h1> Friend Requests </h1>
          {friendsList}
        </div>
    );
  }
}
 
export default FriendRequests;