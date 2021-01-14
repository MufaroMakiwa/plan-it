import React, { Component } from 'react';
import "./FriendMod.css"
import CFCard from "../modules/CFCard.js";

class CurrentFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [
        {
          id: 1,
          name: "Timothee Beaver"
        },

        {
          id: 2,
          name: "Alyssa P. Hacker"
        },

        {
          id: 3,
          name: "Ben Bitdiddle"
        },

        {
          id: 4,
          name: "Jason J. Son"
        },

        {
          id: 5,
          name: "Hah Vad Yahd"
        },

        {
          id: 6,
          name: "Tim Thee Beaver"
        }
      ]
    }
  }

  challengeFriend = () => {
    console.log("Challenge Friend Pop Up");
  }

  unFriend = () => {
    console.log("unfriend functionality");
  }

  render() { 

    let friendsList = null;
    const hasFriends = this.state.friends.length !== 0;

    if (hasFriends) {
      friendsList = this.state.friends.map((friendObj) => (
        <CFCard
          key={`listItem-${friendObj.id}`}

          name={friendObj.name} 
          onChallenge={() => this.challengeFriend()}
          onUnfriend={() => this.unFriend()}
        />
      ));
      
    } else {
      friendsList = <div>No Friends!</div>;
    }

    return ( 
        <div>
          <h1> Current Friends </h1>
          {friendsList}
        </div>
    );
  }
}
 
export default CurrentFriends;