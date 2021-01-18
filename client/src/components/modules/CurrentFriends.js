import React, { Component } from 'react';
import "./FriendMod.css"
import CFCard from "../modules/CFCard.js";

import "../../utilities.css";
import {get, post} from '../../utilities.js';

class CurrentFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    }
  }

  componentDidMount() {
    get("/api/friend/current", {userName: this.props.userName}).then((friends) => {
      this.setState({friends}),
      console.log(friends)
    })
  }

  challengeFriend = () => {
    console.log("Challenge Friend Pop Up");
    this.props.onChallengeButtonClicked()
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

          name={friendObj.userName_1 === this.props.userName ? friendObj.userName_2: friendObj.userName_1}
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