import React, { Component } from 'react';
import CFCard from "../modules/CFCard.js";
import AddTaskDialog from "../modules/AddTaskDialog.js";
import "../../utilities.css";
import "./CurrentFriends.css";
import {get, post} from '../../utilities.js';


class CurrentFriends extends Component {
  constructor(props) {
    super(props);
  }


  render() { 
    let friendsList = null;
    const hasFriends = this.props.currentFriends.length !== 0;

    if (hasFriends) {
      friendsList = this.props.currentFriends.map((friendObj) => (
        <CFCard
          key={`listItem-${friendObj._id}`}
          userName={this.props.userName}
          userId={this.props.userId}
          friendName={friendObj.userName_1 === this.props.userName ? friendObj.userName_2: friendObj.userName_1}
          friendId={friendObj.userName_1 === this.props.userName ? friendObj.userId_2: friendObj.userId_1}
          onUnfriend={() => this.props.filterFriends(friendObj.userName_1 === this.props.userName ? friendObj.userId_2: friendObj.userId_1)}/>
      ));
    } else {
      friendsList = <div>No Friends!</div>;
    }

    return ( 
        <div className="CurrentFriends-container">
          <h1> Current Friends </h1>
          {friendsList}
        </div>
    );
  }
}
 
export default CurrentFriends;