import React, { Component } from 'react';
import "./FriendMod.css"
import FRCard from "../modules/FRCard.js";

class FriendRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [
        {
          id: 1,
          name: "Req Person 1"
        },

        {
          id: 2,
          name: "Req Person 2"
        },

        {
          id: 3,
          name: "Req Person 3"
        }
      ]
    }
  }

  acceptRequest = () => {
    console.log("ACCEPT");
  }

  declineRequest = () => {
    console.log("DECLINE");
  }

  render() { 

    let friendsList = null;
    const hasFriends = this.state.friends.length !== 0;

    if (hasFriends) {
      friendsList = this.state.friends.map((friendObj) => (
        <FRCard
          key={`listItem-${friendObj.id}`}

          name={friendObj.name} 
          onAccept={() => this.acceptRequest()}
          onDecline={() => this.declineRequest()}
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