import React, { Component } from 'react';
import CFCard from "../modules/CFCard.js";
import AddTaskDialog from "../modules/AddTaskDialog.js";
import "../../utilities.css";
import "./CurrentFriends.css";
import {get, post} from '../../utilities.js';
import FriendDetailsDialog from "./FriendDetailsDialog.js";
import EmptyState from "../modules/EmptyState.js";




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
          userEmail={this.props.userEmail}
          friendName={friendObj.userName_1 === this.props.userName ? friendObj.userName_2: friendObj.userName_1}
          friendId={friendObj.userName_1 === this.props.userName ? friendObj.userId_2: friendObj.userId_1}
          friendEmail={friendObj.userName_1 === this.props.userName ? friendObj.userEmail_2: friendObj.userEmail_1}
          onUnfriend={() => this.props.filterFriends(friendObj.userName_1 === this.props.userName ? friendObj.userId_2: friendObj.userId_1)}
          currentFriends={this.props.currentFriends}/>
      ));
    } else {
      friendsList = <EmptyState
                      heading="No friends!"
                      message="You currently do not have any friends. Search for your friends by name and send requests to connect." />
    }

    return ( 
          
        <div>
          <span className="CurrentFriends-title"> Current Friends </span>

          {hasFriends ? (
            <div className="CurrentFriends-grid">
              {friendsList}
            </div>
          ) : (
            <div>
              {friendsList}
            </div>
          )}
          
        </div>
    );
  }
}
 
export default CurrentFriends;