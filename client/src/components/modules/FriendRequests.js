import React, { Component } from 'react';
import "./FriendMod.css"
import FRCard from "../modules/FRCard.js";
import "../../utilities.css";
import {get, post} from '../../utilities.js';

class FriendRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    }
  }

  getRequests = () => {
    console.log("!!!")
    get("/api/friend/requests", {}).then((friends) => {
      this.setState({friends})
    })
  }

  componentDidMount() {
    this.getRequests();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.userName && this.props.userName ) {
      this.getRequests();
    }
  }

  acceptRequest = () => {
    console.log("ACCEPT");
  }

  declineRequest = (friendId) => {
    console.log("DECLINE");
    const friends = this.state.friends.filter((friend) => {
      return !(friend.userId_1 === friendId && friend.userId_2 === this.props.userId ||
              friend.userId_1 === this.props.userId && friend.userId_2 === friendId)
    });
    this.setState({friends});
  }

  render() { 

    let friendsList = null;
    const hasFriends = this.state.friends.length !== 0;

    if (hasFriends) {
      friendsList = this.state.friends.map((friendObj) => (
        <FRCard
          key={`listItem-${friendObj._id}`}
          friendName={friendObj.userName_1 === this.props.userName ? friendObj.userName_2: friendObj.userName_1}
          friendId={friendObj.userName_1 === this.props.userName ? friendObj.userId_2: friendObj.userId_1}
          onAccept={() => this.acceptRequest()}
          onDecline={() => this.declineRequest(friendObj.userName_1 === this.props.userName ? friendObj.userId_2: friendObj.userId_1)}
        />
      ));
      
    } else {
      friendsList = <div>No Requests!</div>;
    }

    return ( 
        <div>
          <h1> Friend Requests </h1>
          {friendsList}
        </div>
    );
  }
}
 
export default FriendRequests;